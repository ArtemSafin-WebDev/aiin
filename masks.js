document.addEventListener("DOMContentLoaded", () => {
  const phoneInputs = Array.from(document.querySelectorAll(".js-phone-input"));

  phoneInputs.forEach((input) => {
    const instance = new Inputmask({ mask: "+7 (999) 999-99-99" });
    instance.mask(input);
  });
});
