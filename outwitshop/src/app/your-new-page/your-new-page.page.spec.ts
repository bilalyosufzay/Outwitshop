import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YourNewPagePage } from './your-new-page.page';

describe('YourNewPagePage', () => {
  let component: YourNewPagePage;
  let fixture: ComponentFixture<YourNewPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(YourNewPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
