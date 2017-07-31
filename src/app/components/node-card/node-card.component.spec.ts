import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { NodeCardComponent } from './node-card.component';

import { Node } from '../../model/node';

describe('NodeCardComponent', () => {
  let component: NodeCardComponent;
  let fixture: ComponentFixture<NodeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeCardComponent);
    component = fixture.componentInstance;

    const fakeData = {
      numericalId: 1,
      name: 'Test Item',
      shortDescription: 'This is a test',
      type: 'menu-item',
      image: [{
          context: 'product-thumbnail-small',
          url: 'http://images.onyo.com/ZzJDmwNdoyKjuak_ablOtLTv53Q=/0x113:683x797/fit-in/240x240/https://onyo.s3.amazonaws.com/picture/498e77eb-78d7-46d6-a434-dd23bf081134.jpg' // tslint:disable-line: max-line-length
      }]
    };
    const fakeNode = new Node(fakeData);
    component.node = fakeNode;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display component name and image', () => {
    const imgElement = fixture.debugElement.query(By.css('.node-card-img'));
    expect(imgElement.nativeElement.src).toBeTruthy();

    const nameElement = fixture.debugElement.query(By.css('.node-text'));
    expect(nameElement.nativeElement.textContent).toBe('Test Item');
  });
});
