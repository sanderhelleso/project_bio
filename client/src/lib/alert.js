

export function alertFormError(ctx, err) {
    const { toastManager } = ctx;

    // if components ctx is not wrapped in a toastManager, exit early
    if (!toastManager) return;

    // split format fields needed and display alert in components ctx passed in
    toastManager.add(err.split('_').join(' '), {
        appearance: 'error',
        autoDismiss: true,
        autoDismissTimeout: 4000
    });
}