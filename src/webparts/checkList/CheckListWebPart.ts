import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './CheckListWebPart.module.scss';
import * as strings from 'CheckListWebPartStrings';
import "../../ExternalRef/css/style.css"

export interface ICheckListWebPartProps {
  description: string;
}

export default class CheckListWebPart extends BaseClientSideWebPart<ICheckListWebPartProps> {

  public render(): void {
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
  
   
  <div class="todo-list">
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
  </div>`;
  CheckboxDesign();
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
const CheckboxDesign = () =>{
  setTimeout(()=>{
    document.querySelector('input[type="checkbox"]').setAttribute('checked','true');
  },100); 
} 