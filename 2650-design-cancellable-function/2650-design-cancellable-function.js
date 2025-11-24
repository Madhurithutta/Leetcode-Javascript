/**
 * @param {Generator} generator
 * @return {[Function, Promise]}
 */
var cancellable = function(generator) {
    let cancelled = false;
    let finished = false;

    const promise = new Promise((resolve, reject) => {
        const step = (method, arg) => {
            if (finished) return;
            let result;
            try {
                result = method.call(generator, arg);
            } catch (err) {
                finished = true;
                reject(err);
                return;
            }

            if (result.done) {
                finished = true;
                resolve(result.value);
                return;
            }

            Promise.resolve(result.value).then(
                (val) => {
                    if (finished) return;
                    if (cancelled) {
                        cancelled = false;
                        step(generator.throw, "Cancelled");
                    } else {
                        step(generator.next, val);
                    }
                },
                (err) => {
                    if (finished) return;
                    if (cancelled) {
                        cancelled = false;
                        step(generator.throw, "Cancelled");
                    } else {
                        step(generator.throw, err);
                    }
                }
            );
        };

        step(generator.next, undefined);
    });

    const cancel = () => {
        if (finished) return;
        cancelled = true;
    };

    return [cancel, promise];
};
