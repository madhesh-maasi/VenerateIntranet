import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HolidaysListWebPart.module.scss';
import * as strings from 'HolidaysListWebPartStrings';
// import "../../ExternalRef/css/bootstrap.css";

import * as $ from "jquery";
import { sp } from "@pnp/pnpjs";
import * as moment from "moment";
import "../../ExternalRef/css/style.css";
import "../../ExternalRef/css/bootstrap.css";
import "../../ExternalRef/js/bootstrap.js";
var alertify: any = require("../../ExternalRef/js/alertify.min.js");

export interface IHolidaysListWebPartProps {
  description: string;
}  
 
export default class HolidaysListWebPart extends BaseClientSideWebPart<IHolidaysListWebPartProps> {


  public onInit(): Promise<void> {
    return super.onInit().then((_) => {
      sp.setup({
        spfxContext: this.context,
      });
    });
  }

  public render(): void {
    this.domElement.innerHTML = `
      <div class="holiday-section">
      <div class="container">
      <h4>Holiday Calendar</h4>
      <ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">

      <li class="nav-item" role="presentation">
        <button class="nav-link active" id="india-tab" data-bs-toggle="tab" data-bs-target="#india" type="button" role="tab" aria-controls="india" aria-selected="true">India</button>
      </li>
      <li class="nav-item" role="presentation">
      <button class="nav-link " id="uk-tab" data-bs-toggle="tab" data-bs-target="#uk" type="button" role="tab" aria-controls="uk" aria-selected="false">United Kingdom</button>
    </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div class="uk-holidays tab-pane fade  " id="uk" role="tabpanel" aria-labelledby="uk-tab">
      <div class="holiday d-flex justify-content-between">
      <div class="holiday-day">New Year</div>
      <div class="holiday-date">01/01/2021</div>
      </div>
      <div class="holiday  d-flex justify-content-between">
      <div class="holiday-day">Christmas</div>
      <div class="holiday-date">12/25/2021</div> 
      </div>
      </div>
      <div class="tab-pane fade show active" id="india" role="tabpanel" aria-labelledby="india-tab">
      
      <div class="accordion mt-2" id="accordionExample">  
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Bangalore
      </button>  
    </h2>        
    <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      <div class="holiday d-flex justify-content-between">
      <div class="holiday-day">New Year</div>
      <div class="holiday-date">01/01/2021</div>
      </div>
      <div class="holiday  d-flex justify-content-between">
      <div class="holiday-day">Christmas</div>
      <div class="holiday-date">12/25/2021</div> 
      </div
      </div>
    </div>
  </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
      <button class="accordion-button " type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Kolkata
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      <div class="holiday d-flex justify-content-between">
      <div class="holiday-day">New Year</div>
      <div class="holiday-date">01/01/2021</div>
      </div>
      <div class="holiday  d-flex justify-content-between">
      <div class="holiday-day">Christmas</div>
      <div class="holiday-date">12/25/2021</div> 
      </div
      </div>
    </div>
  </div>
  </div> 
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingThree">
      <button class="accordion-button " type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Mumbai
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      <div class="holiday d-flex justify-content-between">
      <div class="holiday-day">New Year</div>
      <div class="holiday-date">01/01/2021</div>
      </div>
      <div class="holiday  d-flex justify-content-between">
      <div class="holiday-day">Christmas</div>
      <div class="holiday-date">12/25/2021</div> 
      </div
      </div>
    </div>  
  </div>
  </div>
  <div class="accordion-item d-none">
    <h2 class="accordion-header" id="headingFour">
      <button class="accordion-button " type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseThree">
        Weekend Holidays
      </button>
    </h2>
    <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      <div class="holiday d-flex justify-content-between">
      <div class="holiday-day">New Year</div>
      <div class="holiday-date">01/01/2021</div>
      </div>
      <div class="holiday  d-flex justify-content-between">
      <div class="holiday-day">Christmas</div>
      <div class="holiday-date">12/25/2021</div> 
      </div
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
      ErrorCallBack(error, "fetchcountry");
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
      ErrorCallBack(error, "fetchcountry");
    });
}

async function getHolidays() 
{
   var count=0;  
  for(var i=0;i<arrCountry[0].length;i++)
  {
    await sp.web.lists
    .getByTitle("Holiday Calendar")
    .items.top(5000).filter("Country eq '"+arrCountry[0][i]+"'").get()
    .then(async (items: any[]) => 
    {
      count++;

      for(var j=0;j<items.length;j++)
      {
        await arrHolidays.push({"Country":arrCountry[0][i],"Title":items[j].Title,"Region":items[j].RegionInd,"Date":items[j].HolidayDate});
      }
    })
    .catch((error) => {
      ErrorCallBack(error, "getHolidays");
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
  for(var i=0;i<arrHolidays.length;i++)
    {
      if(arrHolidays[i].Country=="UK")
      {
        var date=moment(arrHolidays[i].Date).format("DD/MM/YYYY")
        html+=`<div class="holiday  d-flex justify-content-between">
        <div class="holiday-day">${arrHolidays[i].Title}</div>
        <div class="holiday-date">${date}</div> 
        </div>`;
      }  
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
      <button class="accordion-button " type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="false" aria-controls="collapse${i}">
      ${arrRegions[0][i]}
      </button>
    </h2>
    <div id="collapse${i}" class="accordion-collapse collapse " aria-labelledby="heading${i}" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        ${getregiondays(arrRegions[0][i])}
      </div>
    </div>
  </div>
  </div> `;
  }

  $("#accordionExample").html("");
  $("#accordionExample").html(html);
  
}

function getregiondays(region)
{
  var html="";
  for(var i=0;i<arrHolidays.length;i++)
  {
    if(arrHolidays[i].Region)
    {
    for(var j=0;j<arrHolidays[i].Region.length;j++)
    {
      if(arrHolidays[i].Region[j]==region&&arrHolidays[i].Country=="India")
      {
        var date=moment(arrHolidays[i].Date).format("DD/MM/YYYY")
        html+=`<div class="holiday  d-flex justify-content-between">
        <div class="holiday-day">${arrHolidays[i].Title}</div>
        <div class="holiday-date">${date}</div> 
        </div>`;
      }
    } 
  } 
  }

  return html;
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
