import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login.component";
import { LoginRoutes } from "./login.router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations:[LoginComponent],
    imports:[
        CommonModule,
        FormsModule,
        RouterModule.forChild(LoginRoutes)
        
    ]
})
export class LoginModule{}