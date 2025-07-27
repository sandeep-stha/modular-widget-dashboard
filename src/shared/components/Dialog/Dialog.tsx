import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Dialog as ShadCnDialog,
} from '@/components/ui/dialog';

import type { DialogPropsType } from './types-dialog';

export function Dialog({
  open = false,
  handleOpenChange,

  title,
  description,

  children,

  primaryAction,
  secondaryAction,
}: DialogPropsType) {
  const secondaryActionComponent = (
    <Button
      variant={secondaryAction?.buttonProps?.variant ?? 'outline'}
      type={primaryAction?.buttonProps?.type ?? 'button'}
      onClick={secondaryAction?.handleFn}
      {...secondaryAction?.buttonProps}
    >
      {secondaryAction?.label ?? 'Close'}
    </Button>
  );
  return (
    <ShadCnDialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="w-full sm:max-w-[425px] md:max-w-[700px]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="max-h-[75dvh] overflow-auto">{children}</div>
        <DialogFooter>
          {!secondaryAction?.hidden && (
            <>
              {secondaryAction?.preventClose ? (
                secondaryActionComponent
              ) : (
                <DialogClose asChild>{secondaryActionComponent}</DialogClose>
              )}
            </>
          )}
          {!primaryAction?.hidden && (
            <Button
              variant={secondaryAction?.buttonProps?.variant ?? 'default'}
              type={primaryAction?.buttonProps?.type ?? 'submit'}
              onClick={primaryAction?.handleFn}
              {...primaryAction?.buttonProps}
            >
              {primaryAction?.label ?? 'Save Changes'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </ShadCnDialog>
  );
}
