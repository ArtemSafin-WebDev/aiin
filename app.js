document.addEventListener("DOMContentLoaded", () => {
  const passwordShow = Array.from(
    document.querySelectorAll(".registration__field-password-show")
  );

  passwordShow.forEach((btn) =>
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      const input = btn.closest(".registration__field")?.querySelector("input");
      if (!input) return;
      input.type = input.type === "text" ? "password" : "text";
      btn.closest(".registration__field")?.classList.toggle("password-shown");
    })
  );

  const selects = Array.from(
    document.querySelectorAll(".registration__select")
  );

  selects.forEach((select) => {
    const btn = select.querySelector(".registration__select-btn");
    const textInput = select.querySelector(".registration__select-btn-input");
    const options = Array.from(
      select.querySelectorAll(".registration__select-option")
    );

    const toggle = () => {
      select.classList.toggle("open");
    };

    const setSelected = (option) => {
      const optionText = option.querySelector(
        ".registration__select-option-text"
      )?.textContent;
      textInput.value = optionText.trim();
      select.classList.remove("open");

      const changeEvent = new Event("change");
      const inputEvent = new Event("input");

      textInput.dispatchEvent(changeEvent);
      textInput.dispatchEvent(inputEvent);
    };

    const filterOptions = (text) => {
      options.forEach((option) => {
        const optionText = option.querySelector(
          ".registration__select-option-text"
        ).textContent;

        console.log("Option text", optionText);
        if (
          optionText.trim().toLowerCase().startsWith(text.trim().toLowerCase())
        ) {
          option.classList.remove("hidden");
        } else {
          option.classList.add("hidden");
        }
      });

      const noResults = !Array.from(
        select.querySelectorAll(".registration__select-option:not(.hidden)")
      ).length;

      if (noResults) {
        select.classList.add("no-results");
      } else {
        select.classList.remove("no-results");
      }
    };

    if (!textInput.hasAttribute("readonly")) {
      textInput.addEventListener("input", (event) => {
        filterOptions(event.target.value);
      });
    }

    options.forEach((option) => {
      const optionInput = option.querySelector("input");
      optionInput.addEventListener("change", () => {
        const checkedOption = options.find((option) => {
          const input = option.querySelector("input");
          return input.checked;
        });
        if (checkedOption) {
          setSelected(checkedOption);
        } else {
          textInput.value = "";
        }
      });
    });

    options.forEach((option) =>
      option.addEventListener("click", () => {
        select.classList.remove("open");
      })
    );

    btn.addEventListener("click", () => {
      toggle();
    });

    document.addEventListener("click", (event) => {
      if (
        event.target.matches(".registration__select") ||
        event.target.closest(".registration__select")
      )
        return;
      select.classList.remove("open");
    });
  });
});
