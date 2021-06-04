import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HolidayExtendedWebPart.module.scss';
import * as strings from 'HolidayExtendedWebPartStrings';
import * as $ from "jquery";
import { sp } from "@pnp/pnpjs";
import * as moment from "moment";
import { graph } from "@pnp/graph";
import "@pnp/graph/users";
import "@pnp/graph/photos";
import "../../ExternalRef/css/style.css";
import "../../ExternalRef/css/bootstrap.css";
import "../../ExternalRef/js/bootstrap.js";
export interface IHolidayExtendedWebPartProps {
  description: string;
}

export default class HolidayExtendedWebPart extends BaseClientSideWebPart<IHolidayExtendedWebPartProps> {
  public onInit(): Promise<void> {
    return super.onInit().then((_) => {
      sp.setup({
        spfxContext: this.context,
      });
    });
  }
  public render(): void {
    this.domElement.innerHTML = `
    <div class="holidayExtended">
    <h4 class="p-2">Holidays - This month</h4>
    <nav>
  <div class="nav nav-tabs" id="nav-tab" role="tablist">
    <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">India</button>
    <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">United Kingdom</button>
  </div>
</nav>  
<div class="tab-content" id="nav-tabContent">
  <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
  

  <div class="accordion accordion-flush india-holidays" id="accordionFlushExample">
  


</div>
  
  
  </div>
  <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
  <div class="section-holidays d-flex flex-wrap uk-holidays">

  </div>
  </div>
</div>
    </div>
    </div>  
    `;
    fetchRegions();
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

var arrCountry=[];
var arrHolidays=[];
var arrRegions=[];

async function fetchRegions() {
  await sp.web.lists
    .getByTitle("Holiday Calendar")
    .fields.filter("EntityPropertyName eq 'RegionInd'")
    .get()
    .then((items: any) => 
    {
      arrRegions.push(items[0].Choices);
      fetchcountry();
    })
    .catch((error) => {
      console.log(error)
    });
}

async function fetchcountry() {
  await sp.web.lists
    .getByTitle("Holiday Calendar")
    .fields.filter("EntityPropertyName eq 'Country'")
    .get()
    .then((items: any) => 
    {
      arrCountry.push(items[0].Choices);
      getHolidays();
    })
    .catch((error) => {
      console.log(error)
    });
}
async function getHolidays() 
{
   var count=0;  
var date = new Date();
var firstDay:any = new Date(date.getFullYear(), date.getMonth(), 2).toLocaleDateString();
var lastDay:any = new Date(date.getFullYear(), date.getMonth() + 1, 0).toLocaleDateString();


var startDateValue =new Date(date.getFullYear(), date.getMonth(), 2).toISOString().split("T")[0] +"T00:00:00";
var EndDateValue =new Date(date.getFullYear(), date.getMonth() + 2, 0).toISOString().split("T")[0] +"T23:59:00";

console.log(startDateValue)
;
console.log(EndDateValue )

  for(var i=0;i<arrCountry[0].length;i++)
  {
    //and HolidayDate ge '"+startDateValue+"' and HolidayDate le '"+EndDateValue+"'
    await sp.web.lists.getByTitle("Holiday Calendar").items.top(5000).filter("Country eq '"+arrCountry[0][i]+"' and HolidayDate ge '"+startDateValue+"' and HolidayDate le '"+EndDateValue+"' ").get().then(async (items: any[]) => 
    {
      count++;

      for(var j=0;j<items.length;j++)
      {
        await arrHolidays.push({"Country":arrCountry[0][i],"Title":items[j].Title,"Region":items[j].RegionInd,"Date":items[j].HolidayDate});
      }
    })
    .catch((error) => {
      console.log(error+"getHolidays");
    });

    if(arrCountry[0].length<=count)
    {
      getUKHolidays();
      getIndiaHolidays();
    }
   
  }

}

async function getUKHolidays() 
{
  var html=""; 
 var ukData= arrHolidays.filter((e)=>  e.Country=="UK")
  if(ukData.length>0){
    for(var i=0;i<arrHolidays.length;i++)
    {
      if(arrHolidays[i].Country=="UK")
      {
        var date=moment(arrHolidays[i].Date).format("DD/MM/YYYY")
        html+=`<div class="holiday-tile p-3 m-3 d-flex justify-content-between">
        <div class="holiday-day">${arrHolidays[i].Title}</div>
        <div class="holiday-date">${date}</div> 
        </div>`;
      }  
    }
  }
  else
  {
    html+=`<h5  class="pt-2">No Holidays for this month</h5>`;
  }


    $(".uk-holidays").html('');
    $(".uk-holidays").html(html);
}

function getIndiaHolidays()
{
  var html="";

  for(var i=0;i<arrRegions[0].length;i++)
  {  
    html+=`<div class="accordion-item">
    <h2 class="accordion-header" id="heading${i}">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="false" aria-controls="collapse${i}">
      ${arrRegions[0][i]}
      </button>
    </h2>
    <div id="collapse${i}" class="accordion-collapse collapse " aria-labelledby="heading${i}" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body p-2"> <div class="section-holidays d-flex flex-wrap">
        ${getregiondays(arrRegions[0][i])}
      </div> </div>
    </div>
  </div>
  `;
  }

  $(".india-holidays").html("");
  $(".india-holidays").html(html);
  
}

function getregiondays(region)
{
  var html="";
  var regData = arrHolidays.filter((r)=>{
    return  r.Region?r.Region.indexOf(region)>=0:""
  })
  if(regData.length>0){
    for(var i=0;i<regData.length;i++)
    {
      if(regData[i].Country=="India")
        {
          var date=moment(regData[i].Date).format("DD/MM/YYYY")
                html+=`<div class="holiday-tile p-3 m-3 d-flex justify-content-between">
                <div class="holiday-day">${regData[i].Title}</div>
                <div class="holiday-date">${date}</div> 
                </div>`;
        }
    }
  // for(var i=0;i<arrHolidays.length;i++)
  // {
  //   if(arrHolidays[i].Region)
  //   {
  //   for(var j=0;j<arrHolidays[i].Region.length;j++)
  //   {
  //     if(arrHolidays[i].Region[j]==region&&arrHolidays[i].Country=="India")
  //     {
  //       var date=moment(arrHolidays[i].Date).format("DD/MM/YYYY")
  //       html+=`<div class="holiday-tile p-3 m-3 d-flex justify-content-between">
  //       <div class="holiday-day">${arrHolidays[i].Title}</div>
  //       <div class="holiday-date">${date}</div> 
  //       </div>`;
  //     }
  //   } 
  // } 
  // }
}
else
{
  html+=`<h5  class="pt-2">No Holidays for this month</h5>`
}

  return html;
}
