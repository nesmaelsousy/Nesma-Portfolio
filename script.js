/* =========================================================
   YEAR
========================================================= */

const yearElement =
  document.getElementById(
    "year"
  );


if (yearElement) {

  yearElement.textContent =
    new Date()
      .getFullYear();

}



/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton =
  document.getElementById(
    "menuButton"
  );


const navLinks =
  document.getElementById(
    "nav-links"
  );


menuButton
  ?.addEventListener(
    "click",
    () => {

      const isOpen =
        navLinks
          .classList
          .toggle(
            "open"
          );


      menuButton.setAttribute(
        "aria-expanded",
        String(
          isOpen
        )
      );


      menuButton.textContent =
        isOpen
          ? "✕"
          : "☰";

    }
  );



navLinks
  ?.querySelectorAll(
    "a"
  )
  .forEach(
    (
      link
    ) => {

      link.addEventListener(
        "click",
        () => {

          navLinks
            .classList
            .remove(
              "open"
            );


          menuButton
            .setAttribute(
              "aria-expanded",
              "false"
            );


          menuButton.textContent =
            "☰";

        }
      );

    }
  );



/* =========================================================
   LANGUAGE DATA
========================================================= */

const translations = {

  en:
    translationsEN,

  ar:
    translationsAR,

};


const projectTranslations = {

  en:
    projectDetailsEN,

  ar:
    projectDetailsAR,

};



let currentLanguage =
  localStorage.getItem(
    "portfolio-language"
  ) || "en";



/* =========================================================
   GET TRANSLATION
========================================================= */

function getTranslation(
  object,
  path
) {

  return path
    .split(".")
    .reduce(
      (
        value,
        key
      ) => {

        return value
          ? value[key]
          : undefined;

      },

      object

    );

}



/* =========================================================
   MODAL REFERENCES
========================================================= */

const projectModal =
  document.getElementById(
    "projectModal"
  );


const modalClose =
  document.getElementById(
    "projectModalClose"
  );


const modalType =
  document.getElementById(
    "modalType"
  );


const modalTitle =
  document.getElementById(
    "modalTitle"
  );


const modalDescription =
  document.getElementById(
    "modalDescription"
  );


const modalRole =
  document.getElementById(
    "modalRole"
  );


const modalGoal =
  document.getElementById(
    "modalGoal"
  );




const modalFeatures =
  document.getElementById(
    "modalFeatures"
  );


const modalTags =
  document.getElementById(
    "modalTags"
  );


const modalGithub =
  document.getElementById(
    "modalGithub"
  );


const modalDemo =
  document.getElementById(
    "modalDemo"
  );


const modalGallery =
  document.getElementById(
    "modalGallery"
  );


const modalMainImage =
  document.getElementById(
    "modalMainImage"
  );


const modalGalleryThumbs =
  document.getElementById(
    "modalGalleryThumbs"
  );


const modalTalkButton =
  document.getElementById(
    "modalTalkButton"
  );


let activeProject =
  null;



/* =========================================================
   SET LANGUAGE
========================================================= */

function setLanguage(
  language
) {

  currentLanguage =
    language;


  localStorage.setItem(
    "portfolio-language",
    language
  );


  const isArabic =
    language === "ar";


  /*
   HTML language
  */

  document.documentElement.lang =
    language;


  document.documentElement.dir =
    isArabic
      ? "rtl"
      : "ltr";


  /*
   Body class
  */

  document.body
    .classList
    .toggle(
      "arabic",
      isArabic
    );


  /*
   Translate text
  */

  document
    .querySelectorAll(
      "[data-i18n]"
    )
    .forEach(
      (
        element
      ) => {

        const key =
          element.dataset.i18n;


        const text =
          getTranslation(
            translations[
              language
            ],
            key
          );


        if (
          text !==
          undefined
        ) {

          element.textContent =
            text;

        }

      }
    );


  /*
   Translate placeholders
  */

  document
    .querySelectorAll(
      "[data-i18n-placeholder]"
    )
    .forEach(
      (
        element
      ) => {

        const key =
          element.dataset
            .i18nPlaceholder;


        const text =
          getTranslation(
            translations[
              language
            ],
            key
          );


        if (
          text !==
          undefined
        ) {

          element.placeholder =
            text;

        }

      }
    );


  /*
   Switch language button
  */

  const switcher =
    document.getElementById(
      "languageSwitcher"
    );


  if (
    switcher
  ) {

    switcher.textContent =
      isArabic
        ? "EN"
        : "AR";

  }


  /*
   Browser title
  */

  document.title =
    isArabic
      ? "نسمة السوسي | مهندسة برمجيات"
      : "Nesma Elsousi | Software Engineer";


  /*
   If modal is open,
   reload it in new language.
  */

  if (
    projectModal
      ?.classList
      .contains(
        "active"
      )
    &&
    activeProject
  ) {

    loadProjectModal(
      activeProject
    );

  }

}



/* =========================================================
   LANGUAGE SWITCHER
========================================================= */

document
  .getElementById(
    "languageSwitcher"
  )
  ?.addEventListener(
    "click",
    () => {

      const nextLanguage =
        currentLanguage === "en"
          ? "ar"
          : "en";


      setLanguage(
        nextLanguage
      );

    }
  );



/* =========================================================
   LOAD PROJECT MODAL
========================================================= */

function loadProjectModal(
  projectKey
) {

  const project =
    projectTranslations[
      currentLanguage
    ]?.[
      projectKey
    ];


  if (
    !project
  ) {

    return;

  }


  activeProject =
    projectKey;



  /* =====================================================
     BASIC DATA
  ===================================================== */

  modalType.textContent =
    project.type;


  modalTitle.textContent =
    project.title;


  modalDescription.textContent =
    project.description;


  modalRole.textContent =
    project.role;


  modalGoal.textContent =
    project.goal;



  /* =====================================================
     PROJECT GALLERY
  ===================================================== */

  modalGalleryThumbs.innerHTML =
    "";


  if (
    project.images &&
    project.images.length > 0
  ) {

    modalGallery.style.display =
      "block";


    /*
      First image
    */

    modalMainImage.src =
      project.images[0];


    modalMainImage.alt =
      `${project.title} screenshot 1`;


    /*
      Generate thumbnails
    */

    project.images.forEach(
      (
        image,
        index
      ) => {

        const button =
          document.createElement(
            "button"
          );


        button.type =
          "button";


        button.className =
          "modal-gallery-thumb";


        if (
          index === 0
        ) {

          button.classList.add(
            "active"
          );

        }



        const img =
          document.createElement(
            "img"
          );


        img.src =
          image;


        img.alt =
          `${project.title} screenshot ${index + 1}`;



        button.appendChild(
          img
        );



        /*
          Click thumbnail
        */

        button.addEventListener(
          "click",
          () => {

            /*
              Fade image
            */

            modalMainImage.style.opacity =
              "0";


            setTimeout(
              () => {

                modalMainImage.src =
                  image;


                modalMainImage.alt =
                  `${project.title} screenshot ${index + 1}`;


                modalMainImage.style.opacity =
                  "1";

              },

              120
            );


            /*
              Remove active
            */

            modalGalleryThumbs
              .querySelectorAll(
                ".modal-gallery-thumb"
              )
              .forEach(
                (
                  thumb
                ) => {

                  thumb
                    .classList
                    .remove(
                      "active"
                    );

                }
              );


            /*
              Active clicked
            */

            button
              .classList
              .add(
                "active"
              );

          }
        );


        modalGalleryThumbs
          .appendChild(
            button
          );

      }
    );


    /*
      Hide thumbnails
      if only one image
    */

    modalGalleryThumbs.style.display =
      project.images.length > 1
        ? "grid"
        : "none";

  }

  else {

    modalGallery.style.display =
      "none";

  }



  /* =====================================================
     FEATURES
  ===================================================== */

  modalFeatures.innerHTML =
    "";


  project.features
    .forEach(
      (
        feature
      ) => {

        const item =
          document.createElement(
            "div"
          );


        item.className =
          "modal-feature-item";


        item.textContent =
          feature;


        modalFeatures
          .appendChild(
            item
          );

      }
    );



  /* =====================================================
     TECHNOLOGIES
  ===================================================== */

  modalTags.innerHTML =
    "";


  project.technologies
    .forEach(
      (
        technology
      ) => {

        const tag =
          document.createElement(
            "span"
          );


        tag.className =
          "tag";


        tag.textContent =
          technology;


        modalTags
          .appendChild(
            tag
          );

      }
    );



  /* =====================================================
     GITHUB
  ===================================================== */

  if (
    project.github
  ) {

    modalGithub.href =
      project.github;


    modalGithub.style.display =
      "inline-flex";

  }

  else {

    modalGithub.style.display =
      "none";

  }



  /* =====================================================
     LIVE DEMO
  ===================================================== */

  if (
    project.demo
  ) {

    modalDemo.href =
      project.demo;


    modalDemo.style.display =
      "inline-flex";

  }

  else {

    modalDemo.style.display =
      "none";

  }

}



/* =========================================================
   OPEN MODAL
========================================================= */

document
  .querySelectorAll(
    ".case-study-btn"
  )
  .forEach(
    (
      button
    ) => {

      button.addEventListener(
        "click",
        () => {

          const projectKey =
            button.dataset.project;


          loadProjectModal(
            projectKey
          );


          projectModal
            .classList
            .add(
              "active"
            );


          projectModal
            .setAttribute(
              "aria-hidden",
              "false"
            );


          document.body
            .classList
            .add(
              "modal-open"
            );

        }
      );

    }
  );



/* =========================================================
   CLOSE MODAL
========================================================= */

function closeProjectModal() {

  projectModal
    .classList
    .remove(
      "active"
    );


  projectModal
    .setAttribute(
      "aria-hidden",
      "true"
    );


  document.body
    .classList
    .remove(
      "modal-open"
    );


  activeProject =
    null;

}



/* CLOSE BUTTON */

modalClose
  ?.addEventListener(
    "click",
    closeProjectModal
  );



/* OVERLAY */

document
  .querySelectorAll(
    "[data-close-modal]"
  )
  .forEach(
    (
      element
    ) => {

      element.addEventListener(
        "click",
        closeProjectModal
      );

    }
  );



/* ESC KEY */

document.addEventListener(
  "keydown",
  (
    event
  ) => {

    if (
      event.key === "Escape"
      &&
      projectModal
        ?.classList
        .contains(
          "active"
        )
    ) {

      closeProjectModal();

    }

  }
);



/* =========================================================
   CTA - TALK ABOUT SIMILAR PROJECT
========================================================= */

modalTalkButton
  ?.addEventListener(
    "click",
    () => {

      closeProjectModal();

    }
  );



/* =========================================================
   REVEAL ANIMATION
========================================================= */

if (
  "IntersectionObserver"
  in window
) {

  const observer =
    new IntersectionObserver(

      (
        entries
      ) => {

        entries.forEach(
          (
            entry
          ) => {

            if (
              entry.isIntersecting
            ) {

              entry.target
                .classList
                .add(
                  "visible"
                );


              observer
                .unobserve(
                  entry.target
                );

            }

          }
        );

      },

      {
        threshold:
          0.08,
      }

    );


  document
    .querySelectorAll(
      ".reveal"
    )
    .forEach(
      (
        element
      ) => {

        observer.observe(
          element
        );

      }
    );

}

else {

  document
    .querySelectorAll(
      ".reveal"
    )
    .forEach(
      (
        element
      ) => {

        element
          .classList
          .add(
            "visible"
          );

      }
    );

}



/* =========================================================
   INITIAL LANGUAGE
========================================================= */

setLanguage(
  currentLanguage
);