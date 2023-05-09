import { Injector } from "@angular/core";
import { LayoutService } from "../app/shared/services/layout.service";
// src/app/shared/services/layout.service
var injector = Injector.create([
  { provide: LayoutService, deps: [] },
]);

var inject =injector.get(LayoutService)

export const environment = {
  
  production: true,
  
    img:`vap.softwaresbuilders.com/`,  

     Server_URL:`https://vap.softwaresbuilders.com/public/api`

 
};
 