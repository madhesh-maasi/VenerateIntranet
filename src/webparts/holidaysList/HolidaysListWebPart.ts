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
import "../../ExternalRef/css/style.css";
import "../../ExternalRef/css/bootstrap.css";
import "../../ExternalRef/js/bootstrap.js";


export interface IHolidaysListWebPartProps {
  description: string;
}  
 
export default class HolidaysListWebPart extends BaseClientSideWebPart<IHolidaysListWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="holiday-section">
      <div class="container">
      <h4>Holiday Calendar</h4>
      <ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link active" id="uk-tab" data-bs-toggle="tab" data-bs-target="#uk" type="button" role="tab" aria-controls="uk" aria-selected="true">United Kingdom</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="india-tab" data-bs-toggle="tab" data-bs-target="#india" type="button" role="tab" aria-controls="india" aria-selected="false">India</button>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active" id="uk" role="tabpanel" aria-labelledby="uk-tab">
      <div class="holiday d-flex justify-content-between">
      <div class="holiday-day">New Year</div>
      <div class="holiday-date">01/01/2021</div>
      </div>
      <div class="holiday  d-flex justify-content-between">
      <div class="holiday-day">Christmas</div>
      <div class="holiday-date">12/25/2021</div> 
      </div>
      </div>
      <div class="tab-pane fade" id="india" role="tabpanel" aria-labelledby="india-tab">
      
      <div class="accordion mt-2" id="accordionExample">  
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Bangalore
      </button>  
    </h2>        
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
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
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
      <button class="accordion-button " type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Kolkata
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
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
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingThree">
      <button class="accordion-button " type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Mumbai
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse show" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
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
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingFour">
      <button class="accordion-button " type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseThree">
        Weekend Holidays
      </button>
    </h2>
    <div id="collapseFour" class="accordion-collapse collapse show" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
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
    </div> 
</div>
      </div>
    `;
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
