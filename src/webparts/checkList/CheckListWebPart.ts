import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './CheckListWebPart.module.scss';
import * as strings from 'CheckListWebPartStrings';

import * as $ from "jquery";
import { sp } from "@pnp/pnpjs";
import "../../ExternalRef/css/style.css";
import "../../ExternalRef/css/bootstrap.css";
import "../../ExternalRef/js/bootstrap.js";
var alertify: any = require("../../ExternalRef/js/alertify.min.js");

var arrcheckedLists=[];
var checkedvalues;
var flgcheckuseralreadyinlist=false;
var UserEmail;
var UserID:any;
var itemid:any;

var propertyvalue="Getting started checklist";
var stralreadyaddentries;
var arrAlreadyAddedchecklists=[];
var alluserData=[];
export interface ICheckListWebPartProps {
  description: string;
}

export default class CheckListWebPart extends BaseClientSideWebPart<ICheckListWebPartProps> {

  public onInit(): Promise<void> {
    return super.onInit().then((_) => {
      sp.setup({
        spfxContext: this.context,
      });
    });
  }

  public render(): void {
    
    UserEmail=this.context.pageContext.user.email;
    propertyvalue=this.properties.description;

    this.domElement.innerHTML = `
    <svg viewBox="0 0 0 0" style="position: absolute; z-index: -1; opacity: 0;">
    <defs> 
      <linearGradient id="boxGradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="25" y2="25">
        <stop offset="0%"   stop-color="#27FDC7"/>
        <stop offset="100%" stop-color="#0FC0F5"/>
      </linearGradient>
   
      <linearGradient id="lineGradient">
        <stop offset="0%"    stop-color="#0FC0F5"/>
        <stop offset="100%"  stop-color="#27FDC7"/>
      </linearGradient>
  
      <path id="todo__line" stroke="url(#lineGradient)" d="M21 12.3h168v0.1z"></path>
      <path id="todo__box" stroke="url(#boxGradient)" d="M21 12.7v5c0 1.3-1 2.3-2.3 2.3H8.3C7 20 6 19 6 17.7V7.3C6 6 7 5 8.3 5h10.4C20 5 21 6 21 7.3v5.4"></path>
      <path id="todo__check" stroke="url(#boxGradient)" d="M10 13l2 2 5-5"></path>
      <circle id="todo__circle" cx="13.5" cy="12.5" r="10"></circle>
    </defs>
  </svg>  
  
   
  <div class="todo-list" id="divtodolist">

    <!--<label class="todo"> 
      <input class="todo__state" type="checkbox" />
      
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 25" class="todo__icon">
        <use xlink:href="#todo__line" class="todo__line"></use>
        <use xlink:href="#todo__box" class="todo__box"></use>
        <use xlink:href="#todo__check" class="todo__check"></use>
        <use xlink:href="#todo__circle" class="todo__circle"></use>
      </svg>
  
      <div class="todo__text">Update your Outlook profile: Add in your full name, designation, a picture, description etc; to help people know who you are at Venerate</div>
      
    </label>
  
    <label class="todo">
   
      <input class="todo__state" type="checkbox" />   
  
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 25" class="todo__icon">
        <use xlink:href="#todo__line" class="todo__line"></use>
        <use xlink:href="#todo__box" class="todo__box"></use>
        <use xlink:href="#todo__check" class="todo__check"></use>
        <use xlink:href="#todo__circle" class="todo__circle"></use> 
      </svg>
  
      <div class="todo__text">Update your Outlook profile: Add in your full name, designation, a picture, description etc; to help people know who you are at Venerate</div>
      
    </label>
  
    <label class="todo">
      <input class="todo__state" type="checkbox" />
      
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 25" class="todo__icon">
        <use xlink:href="#todo__line" class="todo__line"></use>
        <use xlink:href="#todo__box" class="todo__box"></use>
        <use xlink:href="#todo__check" class="todo__check"></use>
        <use xlink:href="#todo__circle" class="todo__circle"></use>
      </svg>
      
      <div class="todo__text">Update your Outlook profile: Add in your full name, designation, a picture, description etc; to help people know who you are at Venerate</div>
    </label>-->
  </div>`;
  // propertyvalue?$('#header-name').text(propertyvalue):$('#header-name').text("")
  checkuseralreadyinlist();

  

  $(document).on("click", ".clschkbox",(e)=>
  {
    // $(this).data("data-id");
    // console.log(e);
    // arrcheckedLists=[];
    //   $('.clschkbox').each(function()
    //   {
    //       if($(this).prop('checked'))
    //       {
    //         arrcheckedLists.push($(this).attr('data-id'));
    //       }
    //   });

    //   checkedvalues = $.map(arrcheckedLists, function(val,index) {
    //     var str = val;
    //         return str;
    //     }).join(";");
      
        var selectedItemId=e.target.getAttribute('data-id');
        var checkeedData=alluserData.filter((i)=>i.TypeOfCheckList.ID==parseInt(selectedItemId)&&i.EmployeeName.EMail.toLowerCase()==UserEmail.toLowerCase());
        checkeedData.length==0?insertchecklist(selectedItemId):deleteItemFromList(checkeedData[0].ID)
  });
 


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
                  //label: strings.DescriptionFieldLabel
                  label:"Type Of Checklist"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
const CheckboxDesign = () =>
{
  setTimeout(()=>{
    document.querySelector('input[type="checkbox"]').setAttribute('checked','true');
  },100); 

} 

async function deleteItemFromList(params) {
  await sp.web.lists.getByTitle("Getting Started : Checklist").items.getById(params).delete().then(()=>{refreshList();console.log('deleted')});
}

async function refreshList() {
  await sp.web.lists.getByTitle("Getting Started : Checklist").items.top(5000).select("EmployeeName/EMail,SelectedChecklists,ID,TypeOfCheckList/ID").expand("EmployeeName,TypeOfCheckList").filter("EmployeeName/EMail eq '"+UserEmail+"'").get().then((items: any[]) => 
  {
    alluserData=[];
    if(items.length>0)
    alluserData=items;
  });
}

async function getChecklist(Checklistname)
{
  var html="";  
  await sp.web.lists
    .getByTitle("Getting Started Checklist")
    .items.filter("TypeOfChecklist eq '"+Checklistname+"'").orderBy("Order",true).get() .then((items: any[]) => 
    {
      
      if(items.length>0)
      {

      html+=`<h3 id="header-name">${propertyvalue}</h3>`
      for(var i=0;i<items.length;i++)
      {
        
        var strChecked="";
        for(var j=0;j<arrAlreadyAddedchecklists.length;j++)
        {
            if(items[i].ID==arrAlreadyAddedchecklists[j])
            strChecked="checked=true";
        }
        
        html+=`    <label class="todo">
        <input data-id="${items[i].ID}" class="todo__state clschkbox" type="checkbox" ${strChecked}/>
        
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 25" class="todo__icon">
          <use xlink:href="#todo__line" class="todo__line"></use>
          <use xlink:href="#todo__box" class="todo__box"></use>
          <use xlink:href="#todo__check" class="todo__check"></use>
          <use xlink:href="#todo__circle" class="todo__circle"></use>
        </svg>
        
        <div class="todo__text" data-id="${items[i].ID}">${items[i].Checklist}</div>
      </label>`;
      }

      $("#divtodolist").html("");
      $("#divtodolist").html(html);
     
    }
    else
    {
      $("#divtodolist").html(`<h3 id="header-name"></h3> No Records Found`);
    }

    //CheckboxDesign();

    })
    .catch(function (error) {
      ErrorCallBack(error, "getChecklist");
    });
}

async function checkuseralreadyinlist()
{
  await sp.web.currentUser.get().then(async function(res)
  { 
     UserID=res.Id;
     await true;
  })

  await sp.web.lists.getByTitle("Getting Started : Checklist").items.top(5000).select("EmployeeName/EMail,SelectedChecklists,ID,TypeOfCheckList/ID").expand("EmployeeName,TypeOfCheckList").filter("EmployeeName/EMail eq '"+UserEmail+"'").get().then((items: any[]) => 
    {
      
      if(items.length>0)
      {
          alluserData=items;
          flgcheckuseralreadyinlist=true;
          itemid=items[0].ID;
          items.map((item)=>{
            if(item.TypeOfCheckList.ID)
            arrAlreadyAddedchecklists.push(item.TypeOfCheckList.ID)
          });
      }
      
      getChecklist(propertyvalue);

      })
      .catch(function (error) {
        ErrorCallBack(error, "checkuseralreadyinlist");
      });
}

async function insertchecklist(selectedItemId)
{

  // if(!flgcheckuseralreadyinlist)
  // {
    var intitemId = parseInt(selectedItemId)
    var requestdata=
    {
      EmployeeNameId:UserID,
      TypeOfCheckListId:intitemId
    };
      await sp.web.lists.getByTitle("Getting Started : Checklist").items.add(requestdata).then(function (data) 
      {
       
            itemid=data.data.ID;
            refreshList();
  
        })
        .catch(function (error) {
          ErrorCallBack(error, "insertchecklist");
        });
  // }
// else
// {
//   var requestdata=
//   {
//     EmployeeNameId:UserID,
//     SelectedChecklists:checkedvalues
//   };
//     await sp.web.lists.getByTitle("Getting Started : Checklist").items.getById(itemid).update(requestdata).then(function (data) 
//     {
//      console.log("updated");
//       })
//       .catch(function (error) {
//         ErrorCallBack(error, "insertchecklistupdate");
//       });
// }
  
      
}

function AlertMessage(strMewssageEN) {
  alertify
    .alert()
    .setting({
      label: "OK",

      message: strMewssageEN,

      onok: function () {
        window.location.href = "#";
      },
    })
    .show()
    .setHeader("<em>Confirmation</em> ")
    .set("closable", false);
}

async function ErrorCallBack(error, methodname) 
{
  AlertMessage("Something went wrong.please contact system admin");
}