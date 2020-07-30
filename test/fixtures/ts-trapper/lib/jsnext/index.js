export function typeWrapper() {
    return (function () {
        // A constructor that can't be called (nothing can satisfy the "never" type).
        // tslint:disable-next-line:no-empty
        function class_1(x) {
        }
        // Inner -> Wrapped Value
        class_1.wrap = function (x) {
            return x;
        };
        // Wrapped Value -> Inner
        class_1.unwrap = function (x) {
            return x;
        };
        // (Inner -> Inner), Wrapped Value -> Wrapped Value
        // Apply a function to the wrapped value.
        class_1.over = function (func, x) {
            return this.wrap(func(this.unwrap(x)));
        };
        return class_1;
    }());
}
// Needs to be used with a brand (the "private brand: any" below); we can't
// avoid this bit of boilerplate, unfortunately. For example,
//
//   class Email extends TypeWrapper<Email,string> {
//     private brand: any;
//   }
//
// eg.
//
//   const email = Email.wrap("foo@bar.com");
//
//   function sendEmail(from: Email, to: Email, subject: string, body: string) {
//     console.log("Sent from", Email.unwrap(from), " to ", Email.unwrap(to));
//     ...
//   }
//
//   // Works:
//   sendEmail(email, email, "Hello me", "It's me.");
//
//   // Explodes:
//   sendEmail(email, "Hello me", "It's me.", email);
//# sourceMappingURL=index.js.map