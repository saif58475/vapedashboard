import { NgModule, Component } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ViewHotelsComponent } from "./Hotels/view-hotels/view-hotels.component";
import { ViewPlanesComponent } from "./plane/view-planes/view-planes.component";
import { ViewNightlifeComponent } from "./night-life/view-nightlife/view-nightlife.component";
import { ViewCarsComponent } from "./cars/view-cars/view-cars.component";
import { ViewPackagesComponent } from "./packages/view-packages/view-packages.component";
import { InsertHotelsComponent } from "./Hotels/insert-hotels/insert-hotels.component";
import { InsertPlanesComponent } from "./plane/insert-planes/insert-planes.component";
import { InsertNightlifeComponent } from "./night-life/insert-nightlife/insert-nightlife.component";
import { InsertCarsComponent } from "./cars/insert-cars/insert-cars.component";
import { InsertPackagesComponent } from "./packages/insert-packages/insert-packages.component";
import { InsertUserComponent } from "./User/insert-user/insert-user.component";
import { InsertCafetableComponent } from "./cafe-tables/insert-cafetable/insert-cafetable.component";
import { ViewCafetableComponent } from "./cafe-tables/view-cafetable/view-cafetable.component";
import { ViewVacationComponent } from "./vacation/view-vacation/view-vacation.component";
import { InsertVacationComponent } from "./vacation/insert-vacation/insert-vacation.component";
import { ViewClientComponent } from "./clients/view-client/view-client.component";
import { InsertClientComponent } from "./clients/insert-client/insert-client.component";





const routes: Routes = [
    {
        path: "",
        children: [
            {
                path: "ViewHotel",
                component: ViewHotelsComponent,
            },
            {
                path: "InsertHotel",
                component: InsertHotelsComponent,
            },
            {
                path: "ViewPlane",
                component: ViewPlanesComponent,
            },
            {
                path: "InsertPlane",
                component: InsertPlanesComponent,
            },
            {
                path: "ViewNightLife",
                component: ViewNightlifeComponent,
            },
            {
                path: "InsertNightLife",
                component: InsertNightlifeComponent,
            },
            {
                path: "ViewTable/:id",
                component: ViewCafetableComponent,
            },
            {
                path: "InsertTable/:id",
                component: InsertCafetableComponent,
            },
            {
                path: "ViewVacation",
                component: ViewVacationComponent,
            },
            {
                path: "InsertVacation",
                component: InsertVacationComponent,
            },
            {
                path: "ViewCar",
                component: ViewCarsComponent,
            },
            {
                path: "InsertCar",
                component: InsertCarsComponent,
            },
            {
                path: "ViewClient",
                component: ViewClientComponent,
            },
            {
                path: "InsertClient",
                component: InsertClientComponent
            },
            {
                path: "ViewPackage",
                component: ViewPackagesComponent,
            },
            {
                path: "InsertPackage",
                component: InsertPackagesComponent,
            },
            {
                path: "InsertUser",
                component: InsertUserComponent,
            },
],
    },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
})
export class AdminRoutingModule { }
