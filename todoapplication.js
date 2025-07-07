import { LightningElement } from 'lwc';

export default class Todoapplication extends LightningElement {
    taskName='';
    taskDate=null;
    incompleteTasks=[];
    completedTasks=[];
    handleChange(event){
        const {name, value}=event.target;
        if(name==='taskName'){
            this.taskName=value;
        }
        if(name==='taskDate'){
            this.taskDate=value;
        }
    }
    resetHandler(){
        this.taskName='';
        this.taskDate=null;
    }

    addTaskHandler(event){
        //if date is missing then add the today date
        if(!this.taskDate){
            this.taskDate=new Date().toISOString().slice(0,10);
        }
        
        if(this.taskValidation()){
            //adding the array of objetcs
            this.incompleteTasks=[...this.incompleteTasks,
                {
                    taskName:this.taskName,
                    taskDate:this.taskDate
                }
            ];
        }
        this.resetHandler(); // to clean the data ont he ionput files after hiting the submit button
        this.sortIcompletearr(this.incompleteTasks);

        //console.log(this.incompleteTasks);
       // console.log('incompleteTasks:', JSON.parse(JSON.stringify(this.incompleteTasks)));
        //console.log(this.incompleteTasks.length);


    }

    taskValidation(){
        let isValid=true;
        let element=this.template.querySelector('.htmlElement'); //to fetch the html elemts 
        //conditons to validate for below
        //if field is empty
        //if filed enterd value is duplicate
        if(!this.taskName){ //cheks the field is empty
            isValid=false;

        }else{
            let taskItem=this.incompleteTasks.find(currentItem => 
                currentItem.taskName===this.taskName
            );
            if(taskItem){
                isValid=false;
                element.setCustomValidity('This Task Already Present');
            }

        }
        if(isValid){
            element.setCustomValidity('');
        }
        element.reportValidity(); //to display the error msg on the display

        return isValid;

    }

    sortIcompletearr(incomletearr){
        let sortedarr=incomletearr.sort((a,b) => {
                    let dateA=new Date(a.taskDate);
                    let dateB=new Date(b.taskDate);
                    return  dateA-dateB }
                );
                return sortedarr;
    }

    deleteButtonHandler(event){
        let index=event.target.name;
       this.incompleteTasks.splice(index, 1);
      let sortedarr= this.sortIcompletearr(this.incompleteTasks);
      this.incompleteTasks=[...sortedarr];
    }
    checkButtonHandler(event){
        let index=event.target.name;
        let removedTask=this.incompleteTasks.splice(index,1);
        this.completedTasks=[...this.completedTasks, removedTask[0]];
        //even after check the task has to removess fom to do task and refresh data has tp eb displaed
        let sortedarr= this.sortIcompletearr(this.incompleteTasks);
        this.incompleteTasks=[...sortedarr];

    }
    removeCompleteHandler(event){
        let index=event.target.name;
        this.completedTasks.splice(index,1);
        let temparr=this.sortIcompletearr(this.completedTasks);
        this.completedTasks=[...temparr];

    }
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

    
}
