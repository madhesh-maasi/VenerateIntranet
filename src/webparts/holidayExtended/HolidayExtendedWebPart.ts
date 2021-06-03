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

  public render(): void {
    this.domElement.innerHTML = `
    <div class="holidayExtended">
    <nav>
  <div class="nav nav-tabs" id="nav-tab" role="tablist">
    <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">India</button>
    <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">United Kingdom</button>
  </div>
</nav>
<div class="tab-content" id="nav-tabContent">
  <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
  <div class="text-end my-2">
  <button class="btn btn-theme rounded-0">This Month</button>
  </div>  

  <div class="accordion accordion-flush" id="accordionFlushExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingOne">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
        Bangalore
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body p-2">
      <div class="section-holidays d-flex flex-wrap">

      <div class="holiday-tile p-3 m-2 d-flex justify-content-between">
      <div class="holiday-day">Christmas</div>
      <div class="holiday-date">12/25/2021</div> 
      </div> 
      
      <div class="holiday-tile p-3 m-2 d-flex justify-content-between">
      <div class="holiday-day">Christmas</div>
      <div class="holiday-date">12/25/2021</div> 
      </div> 
      <div class="holiday-tile p-3 m-2 d-flex justify-content-between">
      <div class="holiday-day">Christmas</div>
      <div class="holiday-date">12/25/2021</div> 
      </div> 
      <div class="holiday-tile p-3 m-2 d-flex justify-content-between">
      <div class="holiday-day">Christmas</div>
      <div class="holiday-date">12/25/2021</div> 
      </div> 
      <div class="holiday-tile p-3 m-2 d-flex justify-content-between">
      <div class="holiday-day">Christmas</div>
      <div class="holiday-date">12/25/2021</div> 
      </div> 
      <div class="holiday-tile p-3 m-2 d-flex justify-content-between">
      <div class="holiday-day">Christmas</div>
      <div class="holiday-date">12/25/2021</div> 
      </div> 
      <div class="holiday-tile p-3 m-2 d-flex justify-content-between">
      <div class="holiday-day">Christmas</div>
      <div class="holiday-date">12/25/2021</div> 
      </div> 
      <div class="holiday-tile p-3 m-2 d-flex justify-content-between">
      <div class="holiday-day">Christmas</div>
      <div class="holiday-date">12/25/2021</div> 
      </div> 

      <div class="holiday-tile p-3 m-2 d-flex justify-content-between">
      <div class="holiday-day">Christmas</div>
      <div class="holiday-date">12/25/2021</div> 
      </div> 
      <div class="holiday-tile p-3 m-2 d-flex justify-content-between">
      <div class="holiday-day">Christmas</div>
      <div class="holiday-date">12/25/2021</div> 
      </div> 
      <div class="holiday-tile p-3 m-2 d-flex justify-content-between">
      <div class="holiday-day">Christmas</div>
      <div class="holiday-date">12/25/2021</div> 
      </div> 
      <div class="holiday-tile p-3 m-2 d-flex justify-content-between">
      <div class="holiday-day">Christmas</div>
      <div class="holiday-date">12/25/2021</div> 
      </div> 

      </div>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
        Kolkata
      </button>
    </h2>
    <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
      
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
        Mumbai
      </button>
    </h2>
    <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">

      </div>
    </div>
  </div>
</div>
  
  
  </div>
  <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">...</div>
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
