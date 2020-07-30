export declare type TypeWrapper<Wrapper, Inner> = {
    new (x: never): {};
    wrap(x: Inner): Wrapper;
    unwrap(x: Wrapper): Inner;
    over(func: (i: Inner) => Inner, x: Wrapper): Wrapper;
};
export declare function typeWrapper<Wrapper, Inner>(): TypeWrapper<Wrapper, Inner>;
