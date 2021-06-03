import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import styles from './MeetTheTeamWebPart.module.scss';
import * as strings from 'MeetTheTeamWebPartStrings';
import * as $ from "jquery";
import { sp } from "@pnp/pnpjs";
import * as moment from "moment";
import { graph } from "@pnp/graph";
import "@pnp/graph/users";
import "@pnp/graph/photos";
import "../../ExternalRef/css/style.css";
import "../../ExternalRef/css/bootstrap.css";
import "../../ExternalRef/js/bootstrap.js";
export interface IMeetTheTeamWebPartProps {
  description: string;
}
var allData=[];
var changedData=[];
var leadershipData=[];
var selectedDesignation;
var selectedDept;
var selectedDOJ,selectedDOB,selectedCountry,selectedHousename;
export default class MeetTheTeamWebPart extends BaseClientSideWebPart<IMeetTheTeamWebPartProps> {

  public onInit(): Promise<void> {
    return super.onInit().then((_) => {
      sp.setup({
        spfxContext: this.context,
      });
      graph.setup({
        spfxContext: this.context
      });
    });
  }

  public render(): void {
    this.domElement.innerHTML = `
      <div class="teams-group">     
      <div class="team-section"> 
      <div class="d-flex justify-content-between"><h4 class="px-3">Meet The Team</h4> 
      <div class="me-3">
      <div class="form-group d-flex align-items-center">
      <label for="usr" class="me-1 text-end">Search</label>
      <input type="text" class="form-control" id="txtSearch">
      
      </div>
      <div class="text-end my-1"></div>
      </div>
      </div>
      <div class="emp-filter-section px-3 my-4">
       
      <div class="d-flex justify-content-between flex-wrap mb-2">
      


      <div class="countryDD d-flex align-items-center emp-filter mb-1">
      <label class="me-1">Country</label>
      <select class="form-control" id="Country-append">
      
      </select>
      </div>
      <div class="DepartmentDD d-flex align-items-center emp-filter mb-1">
      <label class="me-1">Department</label>
      <select class="form-control"  id="Dept-append">
      
      </select>
      </div>
      <div class="houseNameDD d-flex align-items-center emp-filter mb-1">
      <label class="me-1">House name</label>
      <select class="form-control" id="house-append">
      
      </select>
      </div>
      
      </div>
 
      
      
      
      </div>
      <div class="text-end mx-3"><button type="button" class="btn btn-sm btn-danger reset rounded-0 ms-2">Reset</button></div>
      
      <div class="team-employees d-flex flex-wrap"> 
      </div>
      </div> 
      </div>  
    `;
    this.fetchFilterDropDowns("Department","Dept-append");
    this.fetchFilterDropDowns("Country","Country-append");
    this.fetchFilterDropDowns("HouseName","house-append");
    this.getAllUsers(); 

    $('.reset').click(()=>{
      this.bindFilterArray(allData);
      $('#Designation-append').val("");
      $('#Dept-append').val("");
      $('#DOJ-append').val("");
      $('#DOB-append').val("");
      $('#Country-append').val("");
      $('#house-append').val("");
      $("#txtSearch").val("")

    });

    

    $("#txtSearch").on("keyup", () =>{
      var value = $("#txtSearch").val().toLowerCase();
      if(value)
      {
        var filteredData=allData.filter(function(n) {
          if(n.name)
          return n.name.toLowerCase().indexOf(value.toLowerCase())>=0
         });
         this.bindFilterArray(filteredData);
      }
      else
      {
        this.dataBinding(leadershipData)
      }

      
    });


    $('#Designation-append,#Dept-append,#Country-append,#house-append,#DOJ-append,#DOB-append').change(()=>{
       selectedDesignation =$('#Designation-append').val();
       selectedDept =$('#Dept-append').val();
       selectedDOJ =$('#DOJ-append').val();
       selectedDOB =$('#DOB-append').val();
       selectedCountry =$('#Country-append').val();
       selectedHousename =$('#house-append').val();
       if(selectedDept||selectedCountry||selectedHousename)
       {
        var filteredData = allData.filter((e) => { 
          return (!selectedDesignation || e.designation === selectedDesignation) && (!selectedDept || e.department.indexOf(selectedDept)>=0) && (!selectedDOJ || e.dojMonth === selectedDOJ) && (!selectedDOB || e.dobMonth === selectedDOB) && (!selectedCountry || e.country === selectedCountry) && (!selectedHousename || e.housename === selectedHousename);
        });
        this.bindFilterArray(filteredData);
       }
       else
       {
        this.dataBinding(leadershipData);
       }
       
    })
  }

  async bindFilterArray(items)
  {
    var html="";
    if(items.length>0){
      for(let i=0;i<items.length;i++)
      {
        var deptHTML="";
        deptHTML=""
        items[i].department.map((r)=>{
          deptHTML+=` <p class="mb-0">${r}</p>`
        });
        html+=`<div class="section-employee d-flex flex-column border m-3">
        <div class="profile-cover ${items[i].housename} mb-3">   
        <div id="profileImage">${items[i].initials?items[i].initials:"N/A"}</div>
        <!--<img class="" src="https://homepages.cae.wisc.edu/~ece533/images/cat.png" alt="user">-->
        </div>     
          
        <div class="d-flex flex-column p-3">
        <div class="d-flex justify-content-between mb-3">
        <div>
        <h5 class="mb-0">${items[i].name?items[i].name:"N/A"}</h5>
        <p class="designation mb-0">${items[i].designation?items[i].designation:"N/A"}</p>
        </div>
        <div class="c-img">
        <a href="mailto:${items[i].EmployeeEmail?items[i].EmployeeEmail:""}"><div class="c-mail"></div></a>
        </div> 
        </div> 
        <div class="d-flex justify-content-between mb-3"> 
        <div class="userNumber UDetail">
          <h6 class="mb-0">Contact No</h6>
          <p>${items[i].CNumber?items[i].CNumber:"N/A"}</p>
          </div>
         <div class="userDepart UDetail">
         <h6 class="mb-0">Department</h6>
        ${deptHTML?deptHTML:"N/A"}
         </div>
         
        </div>
        <div class="user-info d-flex justify-content-between">
        <div class="user-Country UDetail">
        <h6 class="mb-0">Country</h6>
        <p class="m-0">${items[i].country?items[i].country:"N/A"}</p>
        </div>
        <div class="user-House UDetail">
        <h6 class="mb-0">House name</h6>
        <p class="m-0">${items[i].housename?items[i].housename:"N/A"}</p>
        </div>
        
        </div>
        </div>
    
        </div>`
      }
       

      $('.team-employees').html("")
      $('.team-employees').html(html);

     
    }
    else
    {
      html+=`<h3>No users to display</h3>`;
      $('.team-employees').html("")
      $('.team-employees').html(html);
    }
  }

  async fetchFilterDropDowns(propName,ID)
  {
    var designationHTML="<option value=''>Select</option>";
    await sp.web.lists.getByTitle("MeetTheTeam").fields.filter("EntityPropertyName eq '"+propName+"'").get().then((items: any) => 
    {
      if(items[0].Choices.length>0)
      {
        items[0].Choices.map((m)=>{
          if(propName=="Department"&&m!="Delivery (Utopus)")
          designationHTML+=`<option value='${m}'>${m}</option>`
          else if(propName!="Department")
          designationHTML+=`<option value='${m}'>${m}</option>`
        });
      }
      $('#'+ID).append(designationHTML);
      
    });
  }
  async getAllUsers()
  {
    var html=""
    var deptHTML="";
    var designationHTML="";
    await sp.web.lists.getByTitle("MeetTheTeam").items.top(5000).select("*,EmployeeName/EMail").expand("EmployeeName").filter("Department ne 'Delivery (Utopus)'").get().then(async (list: any[]) => 
    {

      let items = [];
      let nonLeader = [];
      list.forEach((li)=>{
        (li.Department.indexOf("Leadership Team")>=0)?items.push(li):nonLeader.push(li);
      });
      leadershipData=items;
      Array.prototype.push.apply(items,nonLeader); 

      var uniq = {}
      var arrFiltered = items.filter(obj => !uniq[obj.Designation] && (uniq[obj.Designation] = true));
      console.log('arrFiltered', arrFiltered);

      if(arrFiltered.length>0)
        {
          designationHTML+="<option value=''>select</option>"
          arrFiltered.map((m)=>{
            if(m.Designation)
            designationHTML+=`<option value='${m.Designation}'>${m.Designation}</option>`
           
          });
        }
        $('#Designation-append').append(designationHTML);

     
      if(items.length>0){
        for(let i=0;i<items.length;i++)
        {
          
          var fName = items[i].Title.split(" ")[0].charAt(0);
          var lName=items[i].Title.split(" ")[items[i].Title.split(" ").length-1].charAt(0);

          allData.push({"initials":fName+lName,"department":items[i].Department,"name":items[i].Title,"designation":items[i].Designation,"doj":items[i].DOJ,"dob":items[i].DOBOfficial,"country":items[i].Country,"housename":items[i].HouseName,"dojMonth":moment(items[i].DOJ, "DD-MM-YYYY").format('MM'),"dobMonth":moment(items[i].DOBOfficial, "DD-MM-YYYY").format('MM'),"EmployeeEmail":items[i].EmployeeName?items[i].EmployeeName.EMail:"","CNumber":items[i].ContactNumber});
          if(items.length-1==i)
          this.dataBinding(items);        
        }      
      }
    });
  }

  async dataBinding(items){
    var deptHTML="";
    var html=""
    for(let i=0;i<items.length;i++)
    {
      if(items[i].Department.indexOf("Leadership Team")>=0)
      {
        var fName = items[i].Title.split(" ")[0].charAt(0);
        var lName=items[i].Title.split(" ")[items[i].Title.split(" ").length-1].charAt(0);

        deptHTML=""
        items[i].Department.map((r)=>{
          deptHTML+=` <p class="mb-0">${r}</p>`
        });
        html+=`<div class="section-employee d-flex flex-column border m-3">
        <div class="profile-cover ${items[i].HouseName} mb-3">   
        <div id="profileImage">${fName+lName}</div>
        <!--<img class="" src="https://homepages.cae.wisc.edu/~ece533/images/cat.png" alt="user">-->
        </div>    
         
        <div class="d-flex flex-column p-3">
        <div class="d-flex justify-content-between mb-3">
        <div>
        <h5 class="mb-0">${items[i].Title?items[i].Title:"N/A"}</h5>
        <p class="designation mb-0">${items[i].Designation?items[i].Designation:"N/A"}</p>
        </div>
        <div class="c-img">
        <a href="mailto:${items[i].EmployeeName?items[i].EmployeeName.EMail:""}"><div class="c-mail"></div></a>
        </div> 
        </div> 
        <div class="d-flex justify-content-between mb-3"> 
        <div class="userNumber UDetail">
        <h6 class="mb-0">Contact No</h6>
        <p>${items[i].ContactNumber?items[i].ContactNumber:"N/A"}</p>
        </div>
         <div class="userDepart UDetail">
         <h6 class="mb-0">Department</h6>
        ${deptHTML?deptHTML:"N/A"}
         </div>
         
        </div>
        <div class="user-info d-flex justify-content-between">
        <div class="user-Country UDetail">
        <h6 class="mb-0">Country</h6>
        <p class="m-0">${items[i].Country?items[i].Country:"N/A"}</p>
        </div>
        <div class="user-House UDetail">
        <h6 class="mb-0">House name</h6>
        <p class="m-0">${items[i].HouseName?items[i].HouseName:"N/A"}</p>
        </div>
        
        </div>
        </div>
    
        </div>`
      }
    }
    $('.team-employees').html("")
    $('.team-employees').html(html);

  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
