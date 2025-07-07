# toDoTaskApplication


Key points or Topics i have used:
Useful links:
Component Library: https://developer.salesforce.com/docs/component-library/overview/components

SLDS1 : https://v1.lightningdesignsystem.com/


Component creation
Slds 
 Slds of grid with 3 columns
For grid : https://v1.lightningdesignsystem.com/utilities/grid/#site-main-content
SLDS:   https://v1.lightningdesignsystem.com/
Slds-col
slds-grid 
Slds-wrap
slds-col slds-size_8-of-12
slds-col slds-size_4-of-12"
slds-p-around_medium
slds-p-around_small
slds-m-left_medium 
slds-m-right_medium 
slds-box
slds-box slds-theme_shade → for shadow background theme


lightning-card tag
	title
lightning-input
	label
	name
	onchange -> event
	value
	required
	placeholder
	Message-when-value-missing
lightning-input
	type="date"
	label
	name
	onchange->event
	value
	Field-level-help
lightning-button 
	variant ="brand"
	label
	name
	onclick
	value
	Field-level-help
template  
	for:each
	for:item
	for:index
	key
	value
	Field-level-help
lightning-button-icon   
	icon-name="utility:delete" 
	variant
	alternative-text="Delete"
	title
	onclick -> event
	name={loopindex} -> passing the inex from the template for each loop


for Drag and Drop functionality:
In the Drag section or div —> 
draggable="true" 
ondragstart={startDragHandler} 
data-item={loopindex} → index of for loop for linking or connecting in the element and logic of event
After drag or in drop section
In the Drop section or div —> 
ondragover={aloowDropHandler} 
ondrop={finallyDropedHandler}
lightning-formatted-date-time  
	value={currentTaskItem.taskDate}
	year="2-digit" 
	month="short" 
	day="2-digit" 
	weekday="long"



JS logics : to learn or look into

onchangeHandler
const {name, value}=event.target;

How to reset properties
this.taskDate=new Date().toISOString().slice(0,10);
new Date()- > returns today date 
		toISOString - > converts the Date to string
		slice(0,10) -> slices or retun substring the of string from index 0th to 9th




Spread operator 
 this.incompleteTasks=[...this.incompleteTasks,
                {
                    taskName:this.taskName,
                    taskDate:this.taskDate
                }
            ];

Array of sorting of objects
    sortIcompletearr(incomletearr){
        let sortedarr=incomletearr.sort((a,b) => {
                    let dateA=new Date(a.taskDate);
                    let dateB=new Date(b.taskDate);
                    return  dateA-dateB }
                );
                return sortedarr;
    }

To delete items from Array 
splice() 
	It is used to remove , add or replace the items and also it is return the arrey of elements action permed
    deleteButtonHandler(event){
        let index=event.target.name;
       this.incompleteTasks.splice(index, 1);
      let sortedarr= this.sortIcompletearr(this.incompleteTasks);
      this.incompleteTasks=[...sortedarr];
    }


To add in array using the splice() 
checkButtonHandler(event){
        let index=event.target.name;
        let removedTask=this.incompleteTasks.splice(index,1);
        this.completedTasks=[...this.completedTasks, removedTask[0]];
        //even after check the task has to removess fom to do task and refresh data has tp eb displaed
        let sortedarr= this.sortIcompletearr(this.incompleteTasks);
        this.incompleteTasks=[...sortedarr];


    }


For Drag and Drop
    //draging
    startDragHandler(event){
        event.dataTransfer.setData('iamdraggedfrom', event.target.dataset.item);


    }
    aloowDropHandler(event){
        event.preventDefault();


    }
    finallyDropedHandler(event){
        let index= event.dataTransfer.getData('iamdraggedfrom'); //it will return the index
        let removedTask=this.incompleteTasks.splice(index,1); //returnt the removed data or arr
        this.completedTasks=[...this.completedTasks, removedTask[0]];
        //even after check the task has to removess fom to do task and refresh data has tp eb displaed
        let sortedarr= this.sortIcompletearr(this.incompleteTasks);
        this.incompleteTasks=[...sortedarr];


    }
	event.preventDefault(); —> to prevent or stop the default behavior
