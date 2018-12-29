import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name:'monthpipe'})
export class ChangeMonth implements PipeTransform{
    temp: any;
    month: any;
    transform(time: any ){
        time = new Date();
        this.temp = time.getMonth();
        switch(this.temp){
            case 0: 
                this.month="Tháng 1";
                break;
            case 1: 
                this.month="Tháng 2";
                break;
            case 2:
                this.month="Tháng 3";
                break;
            case 3:
                this.month="Tháng 4";
                break;
            case 4:
                this.month="Tháng 5";
                break;
            case 5:
                this.month="Tháng 6";
                break;
            case 6:
                this.month="Tháng 7";
                break;
            case 7:
                this.month="Tháng 8";
                break;
            case 8:
                this.month="Tháng 9";
                break;
            case 9:
                this.month="Tháng 10";
                break;
            case 10:
                this.month="Tháng 11";
                break;
            case 11:
                this.month="Tháng 12";
                break;
        }
        return this.month;
        
    }
}