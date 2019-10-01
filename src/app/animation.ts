import {
  trigger,
  transition,
  style,
  query,
  animate,
  group
} from '@angular/animations';

export const fade =
  trigger('routeAnimations', [
    transition('fadeHome <=> fadeHelp', [
      query(':enter, :leave', [
        style({
          position: 'absolute',
          left: 0,
          opacity: 0,
          transform: 'scale(0) translateY(80%)',
        }),
      ]),
      query(':enter', [
        animate('500ms ease', style({ opacity: 1, transform: 'scale(1) translateY(0)', position: 'relative' })),
      ])
    ]),
  ]);

  function slideTo(direction) {
    const optional = { optional: true };
    return [
      query(':enter, :leave', [
        style({
          position: 'absolute',
          [direction]: 0,
          width: '100%'
        })
      ], optional),
      query(':enter', [
        style({ [direction]: '-100%'})
      ]),
      group([
        query(':leave', [
          animate('600ms ease', style({ [direction]: '100%'}))
        ], optional),
        query(':enter', [
          animate('600ms ease', style({ [direction]: '0%'}))
        ])
      ])
    ];
  }

  export const slide =
  trigger('routeAnimations', [
    transition('* => isLeft', slideTo('left') ),
    transition('* => isRight', slideTo('right') ),
    transition('isRight => *', slideTo('left') ),
    transition('isLeft => *', slideTo('right') )
  ]);