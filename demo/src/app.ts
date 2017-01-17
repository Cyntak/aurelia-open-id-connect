import { autoinject, LogManager } from "aurelia-framework";
import { RouterConfiguration, Router } from "aurelia-router";
import { User, Log } from "oidc-client";
import { OpenIdConnect, OpenIdConnectRoles } from "aurelia-open-id-connect";

@autoinject
export class App {

  private router: Router;
  private user: User;

  constructor(
    private openIdConnect: OpenIdConnect) {
    this.openIdConnect.logger.enableLogging(Log.NONE);
    this.openIdConnect.userManager.getUser().then((user) => {
      this.user = user;
    });

    LogManager.setLevel(LogManager.logLevel.none);
  }

  public configureRouter(routerConfiguration: RouterConfiguration, router: Router) {

    // switch from hash (#) to slash (/) navigation
    routerConfiguration.options.pushState = true;
    routerConfiguration.title = "OpenID Connect Implicit Flow Demo";

    // configure routes
    routerConfiguration.map([
      {
        moduleId: "home", name: "home", nav: true, route: [""],
        settings: { roles: [OpenIdConnectRoles.Everyone] }, title: "home",
      },
    ]);

    this.openIdConnect.configure(routerConfiguration);
    this.router = router;
  }
}
