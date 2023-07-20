import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";
import { HomeRoutes } from "./home.router";


@NgModule({
    declarations:[HomeComponent],
    imports:[
        RouterModule.forChild(HomeRoutes)
    ]
})
export class HomeModule{}