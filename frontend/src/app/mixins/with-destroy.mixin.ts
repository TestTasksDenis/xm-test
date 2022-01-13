import { Directive, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { Constructor } from '../types/constructor.type';

interface WithDestroy$ {
  destroy$: Subject<void>;
}

export function WithDestroy<T extends Constructor<{}>>(Base: T = (class {} as any)): Constructor<WithDestroy$> & T {
  @Directive()
  class WithDestroyComponent extends Base implements OnDestroy {
    destroy$ = new Subject<void>();

    ngOnDestroy() {
      this.destroy$.next();
    }
  }

  return WithDestroyComponent;
}
