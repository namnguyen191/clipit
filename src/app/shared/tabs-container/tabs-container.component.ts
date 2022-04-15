import {
  AfterContentInit,
  Component,
  ContentChildren,
  QueryList
} from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs-container',
  templateUrl: './tabs-container.component.html',
  styleUrls: ['./tabs-container.component.scss']
})
export class TabsContainerComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;

  constructor() {}

  ngAfterContentInit(): void {
    if (this.tabs.length === 0) return;

    const activeTabs = this.tabs.filter((tab) => tab.active);

    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  // always return false to prevent default link behaviour
  selectTab(tab: TabComponent): false {
    // turn all other tabs to inactive
    this.tabs.forEach((tab) => (tab.active = false));

    tab.active = true;

    return false;
  }
}
