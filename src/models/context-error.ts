const ERROR_NAME: string = 'Error Trace';

export class ContextError extends Error {
    constructor(text: string, error: Error) {
        let errorText = '\n';

        let stack = error.stack;

        if (error.stack.startsWith(ERROR_NAME)) {
            stack = stack.slice(ERROR_NAME.length + 1);
        }

        errorText += stack + '\n\n';

        errorText +=  'Resulting Error: ' + text;

        super(errorText);

        this.name = ERROR_NAME;
    }
}
