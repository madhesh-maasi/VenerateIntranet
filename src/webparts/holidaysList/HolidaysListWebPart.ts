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
      <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link active" id="uk-tab" data-bs-toggle="tab" data-bs-target="#uk" type="button" role="tab" aria-controls="uk" aria-selected="true">United Kingdom</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="india-tab" data-bs-toggle="tab" data-bs-target="#india" type="button" role="tab" aria-controls="india" aria-selected="false">India</button>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active" id="uk" role="tabpanel" aria-labelledby="uk-tab">
      <div class="holiday">New Year</div>
      <div class="holiday">Christmas</div>
      </div>
      <div class="tab-pane fade" id="india" role="tabpanel" aria-labelledby="india-tab">
      <div class="holiday">New Year</div>
      <div class="holiday">Diwali</div> 
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
