import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';


export class CustomReuseStrategy extends RouteReuseStrategy {
  handlers: { [key: string]: DetachedRouteHandle } = {};
  routesToCashe: string[] = ['drawing'];

  /** Determines if this route (and its subtree) should be detached to be reused later */
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return this.routesToCashe.includes(route.routeConfig.path);
  };
  /**
   * Stores the detached route.
   *
   * Storing a `null` value should erase the previously stored value.
   */
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
    this.handlers[route.routeConfig.path] = handle;
  };
  /** Determines if this route (and its subtree) should be reattached */
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!this.handlers[route.routeConfig.path];
  };
  /** Retrieves the previously stored route */
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return this.handlers[route.routeConfig.path];
  };
  /** Determines if a route should be reused */
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return curr.routeConfig === future.routeConfig;
  };
}