import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './MeetTheTeamWebPart.module.scss';
import * as strings from 'MeetTheTeamWebPartStrings';
import "../../ExternalRef/css/style.css";
import "../../ExternalRef/css/bootstrap.css";
import "../../ExternalRef/js/bootstrap.js";
export interface IMeetTheTeamWebPartProps {
  description: string;
}

export default class MeetTheTeamWebPart extends BaseClientSideWebPart<IMeetTheTeamWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="teams-group">     
      <div class="team-section"> 
      <h4 class="px-3">Meet The Team</h4>
      <div class="emp-filter-section d-flex px-3 my-4">
      <div class="DesignationDD d-flex align-items-center me-4">
      <label class="me-1">Designation</label>
      <select class="form-control">
      <option>Administrative Manager</option>
      <option>Associate - Business Analyst</option>
      <option>Associate Technical Architect</option>
      <option>Associate-Quality Assuarance</option>
      </select>
      </div>
      <div class="DepartmentDD d-flex align-items-center me-4">
      <label class="me-1">Department</label>
      <select class="form-control">
      <option>Administration</option>
      <option>Delivery</option>
      <option>Sales</option>
      </select>
      </div>
      <div class="DOJDD d-flex align-items-center me-4">
      <label class="me-1">Date of joining</label>
      <select class="form-control">
      <option>January</option>
      <option>February</option>
      <option>March</option>
      <option>April</option>
      <option>May</option>
      <option>June</option>
      <option>July</option>
      <option>August</option>
      <option>September</option>
      <option>October</option>
      <option>November</option>
      <option>December</option>
      </select>
      </div>
      <div class="DOBDD d-flex align-items-center me-4">
      <label class="me-1">Date of Birth</label>
      <select class="form-control">
      <option>January</option>
      <option>February</option>
      <option>March</option>
      <option>April</option>
      <option>May</option>
      <option>June</option>
      <option>July</option>
      <option>August</option>
      <option>September</option>
      <option>October</option>
      <option>November</option>
      <option>December</option>
      </select>
      </div>
      <div class="countryDD d-flex align-items-center me-4">
      <label class="me-1">Country</label>
      <select class="form-control">
      <option>India</option>
      <option>UK</option>
      </select>
      </div>
      <div class="houseNameDD d-flex align-items-center me-4">
      <label class="me-1">House name</label>
      <select class="form-control">
      <option>Slytherin</option>
      <option>Ravenclaw</option>
      </select>
      </div>
      
      </div>
      <div class="team-employees d-flex flex-wrap"> 



      <div class="section-employee d-flex flex-column border m-3">
      <div class="profile-cover mb-3">   
      <img class="" src ="https://homepages.cae.wisc.edu/~ece533/images/cat.png"  alt="user">
      </div>    
      
      <div class="d-flex flex-column p-3">
      <div class="d-flex justify-content-between mb-3">
      <div>
      <h5 class="mb-0">Chandru D</h5>
      <p class="designation mb-0">Designer</p>
      </div>
      <div class="c-img">
      <div class="c-mail"></div>
      </div> 
      </div> 
      <div class="d-flex justify-content-between mb-3"> 
      <div class="date UDetail">
       <div class="doj mb-2">
       <h6 class="mb-0">DOJ</h6>  
       <p class="mb-0">02-Nov-16</p>
       </div>
       <div class="doj ">
       <h6 class="mb-0">DOB</h6>
       <p class="mb-0">02-Nov-95</p>
       </div>
       </div>
       <div class="userDepart UDetail">
       <h6 class="mb-0">Department</h6>
       <p class="mb-0">Delivery</p>
       <p class="mb-0">Leadership Team</p>
       </div>
       
      </div>
      <div class="user-info d-flex justify-content-between">
      <div class="user-Country UDetail">
      <h6 class="mb-0">Country</h6>
      <p class="m-0">India</p>
      </div>
      <div class="user-House UDetail">
      <h6 class="mb-0">House name</h6>
      <p class="m-0">Ravenclaw</p>
      </div>
      
      </div>
      </div>

      </div>


      <div class="section-employee d-flex flex-column border m-3">
      <div class="profile-cover mb-3">   
      <img class="" src ="https://homepages.cae.wisc.edu/~ece533/images/cat.png"  alt="user">
      </div>    
      
      <div class="d-flex flex-column p-3">
      <div class="d-flex justify-content-between mb-3">
      <div>
      <h5 class="mb-0">Chandru D</h5>
      <p class="designation mb-0">Designer</p>
      </div>
      <div class="c-img">
      <div class="c-mail"></div>
      </div> 
      </div> 
      <div class="d-flex justify-content-between mb-3"> 
      <div class="date UDetail">
       <div class="doj mb-2">
       <h6 class="mb-0">DOJ</h6>  
       <p class="mb-0">02-Nov-16</p>
       </div>
       <div class="doj ">
       <h6 class="mb-0">DOB</h6>
       <p class="mb-0">02-Nov-95</p>
       </div>
       </div>
       <div class="userDepart UDetail">
       <h6 class="mb-0">Department</h6>
       <p class="mb-0">Delivery</p>
       <p class="mb-0">Leadership Team</p>
       </div>
       
      </div>
      <div class="user-info d-flex justify-content-between">
      <div class="user-Country UDetail">
      <h6 class="mb-0">Country</h6>
      <p class="m-0">India</p>
      </div>
      <div class="user-House UDetail">
      <h6 class="mb-0">House name</h6>
      <p class="m-0">Ravenclaw</p>
      </div>
      
      </div>
      </div>

      </div>


      <div class="section-employee d-flex flex-column border m-3">
      <div class="profile-cover mb-3">   
      <img class="" src ="https://homepages.cae.wisc.edu/~ece533/images/cat.png"  alt="user">
      </div>    
      
      <div class="d-flex flex-column p-3">
      <div class="d-flex justify-content-between mb-3">
      <div>
      <h5 class="mb-0">Chandru D</h5>
      <p class="designation mb-0">Designer</p>
      </div>
      <div class="c-img">
      <div class="c-mail"></div>
      </div> 
      </div> 
      <div class="d-flex justify-content-between mb-3"> 
      <div class="date UDetail">
       <div class="doj mb-2">
       <h6 class="mb-0">DOJ</h6>  
       <p class="mb-0">02-Nov-16</p>
       </div>
       <div class="doj ">
       <h6 class="mb-0">DOB</h6>
       <p class="mb-0">02-Nov-95</p>
       </div>
       </div>
       <div class="userDepart UDetail">
       <h6 class="mb-0">Department</h6>
       <p class="mb-0">Delivery</p>
       <p class="mb-0">Leadership Team</p>
       </div>
       
      </div>
      <div class="user-info d-flex justify-content-between">
      <div class="user-Country UDetail">
      <h6 class="mb-0">Country</h6>
      <p class="m-0">India</p>
      </div>
      <div class="user-House UDetail">
      <h6 class="mb-0">House name</h6>
      <p class="m-0">Ravenclaw</p>
      </div>
      
      </div>
      </div>

      </div>


      <div class="section-employee d-flex flex-column border m-3">
      <div class="profile-cover mb-3">   
      <img class="" src ="https://homepages.cae.wisc.edu/~ece533/images/cat.png"  alt="user">
      </div>    
      
      <div class="d-flex flex-column p-3">
      <div class="d-flex justify-content-between mb-3">
      <div>
      <h5 class="mb-0">Chandru D</h5>
      <p class="designation mb-0">Designer</p>
      </div>
      <div class="c-img">
      <div class="c-mail"></div>
      </div> 
      </div> 
      <div class="d-flex justify-content-between mb-3"> 
      <div class="date UDetail">
       <div class="doj mb-2">
       <h6 class="mb-0">DOJ</h6>  
       <p class="mb-0">02-Nov-16</p>
       </div>
       <div class="doj ">
       <h6 class="mb-0">DOB</h6>
       <p class="mb-0">02-Nov-95</p>
       </div>
       </div>
       <div class="userDepart UDetail">
       <h6 class="mb-0">Department</h6>
       <p class="mb-0">Delivery</p>
       <p class="mb-0">Leadership Team</p>
       </div>
       
      </div>
      <div class="user-info d-flex justify-content-between">
      <div class="user-Country UDetail">
      <h6 class="mb-0">Country</h6>
      <p class="m-0">India</p>
      </div>
      <div class="user-House UDetail">
      <h6 class="mb-0">House name</h6>
      <p class="m-0">Ravenclaw</p>
      </div>
      
      </div>
      </div>

      </div>



      <div class="section-employee d-flex flex-column border m-3">
      <div class="profile-cover mb-3">   
      <img class="" src ="https://homepages.cae.wisc.edu/~ece533/images/cat.png"  alt="user">
      </div>    
      
      <div class="d-flex flex-column p-3">
      <div class="d-flex justify-content-between mb-3">
      <div>
      <h5 class="mb-0">Chandru D</h5>
      <p class="designation mb-0">Designer</p>
      </div>
      <div class="c-img">
      <div class="c-mail"></div>
      </div> 
      </div> 
      <div class="d-flex justify-content-between mb-3"> 
      <div class="date UDetail">
       <div class="doj mb-2">
       <h6 class="mb-0">DOJ</h6>  
       <p class="mb-0">02-Nov-16</p>
       </div>
       <div class="doj ">
       <h6 class="mb-0">DOB</h6>
       <p class="mb-0">02-Nov-95</p>
       </div>
       </div>
       <div class="userDepart UDetail">
       <h6 class="mb-0">Department</h6>
       <p class="mb-0">Delivery</p>
       <p class="mb-0">Leadership Team</p>
       </div>
       
      </div>
      <div class="user-info d-flex justify-content-between">
      <div class="user-Country UDetail">
      <h6 class="mb-0">Country</h6>
      <p class="m-0">India</p>
      </div>
      <div class="user-House UDetail">
      <h6 class="mb-0">House name</h6>
      <p class="m-0">Ravenclaw</p>
      </div>
      
      </div>
      </div>

      </div>



      <div class="section-employee d-flex flex-column border m-3">
      <div class="profile-cover mb-3">   
      <img class="" src ="https://homepages.cae.wisc.edu/~ece533/images/cat.png"  alt="user">
      </div>    
      
      <div class="d-flex flex-column p-3">
      <div class="d-flex justify-content-between mb-3">
      <div>
      <h5 class="mb-0">Chandru D</h5>
      <p class="designation mb-0">Designer</p>
      </div>
      <div class="c-img">
      <div class="c-mail"></div>
      </div> 
      </div> 
      <div class="d-flex justify-content-between mb-3"> 
      <div class="date UDetail">
       <div class="doj mb-2">
       <h6 class="mb-0">DOJ</h6>  
       <p class="mb-0">02-Nov-16</p>
       </div>
       <div class="doj ">
       <h6 class="mb-0">DOB</h6>
       <p class="mb-0">02-Nov-95</p>
       </div>
       </div>
       <div class="userDepart UDetail">
       <h6 class="mb-0">Department</h6>
       <p class="mb-0">Delivery</p>
       <p class="mb-0">Leadership Team</p>
       </div>
       
      </div>
      <div class="user-info d-flex justify-content-between">
      <div class="user-Country UDetail">
      <h6 class="mb-0">Country</h6>
      <p class="m-0">India</p>
      </div>
      <div class="user-House UDetail">
      <h6 class="mb-0">House name</h6>
      <p class="m-0">Ravenclaw</p>
      </div>
      
      </div>
      </div>

      </div>


      <div class="section-employee d-flex flex-column border m-3">
      <div class="profile-cover mb-3">   
      <img class="" src ="https://homepages.cae.wisc.edu/~ece533/images/cat.png"  alt="user">
      </div>    
      
      <div class="d-flex flex-column p-3">
      <div class="d-flex justify-content-between mb-3">
      <div>
      <h5 class="mb-0">Chandru D</h5>
      <p class="designation mb-0">Designer</p>
      </div>
      <div class="c-img">
      <div class="c-mail"></div>
      </div> 
      </div> 
      <div class="d-flex justify-content-between mb-3"> 
      <div class="date UDetail">
       <div class="doj mb-2">
       <h6 class="mb-0">DOJ</h6>  
       <p class="mb-0">02-Nov-16</p>
       </div>
       <div class="doj ">
       <h6 class="mb-0">DOB</h6>
       <p class="mb-0">02-Nov-95</p>
       </div>
       </div>
       <div class="userDepart UDetail">
       <h6 class="mb-0">Department</h6>
       <p class="mb-0">Delivery</p>
       <p class="mb-0">Leadership Team</p>
       </div>
       
      </div>
      <div class="user-info d-flex justify-content-between">
      <div class="user-Country UDetail">
      <h6 class="mb-0">Country</h6>
      <p class="m-0">India</p>
      </div>
      <div class="user-House UDetail">
      <h6 class="mb-0">House name</h6>
      <p class="m-0">Ravenclaw</p>
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
