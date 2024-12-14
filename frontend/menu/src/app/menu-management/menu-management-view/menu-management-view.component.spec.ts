import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuManagementViewComponent } from './menu-management-view.component';

describe('MenuManagementViewComponent', () => {
  let component: MenuManagementViewComponent;
  let fixture: ComponentFixture<MenuManagementViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuManagementViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuManagementViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
