import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAliveViewComponent } from './menu-alive-view.component';

describe('MenuAliveViewComponent', () => {
  let component: MenuAliveViewComponent;
  let fixture: ComponentFixture<MenuAliveViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuAliveViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuAliveViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
