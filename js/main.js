$(document).ready(function () {
  var hotelSlider = new Swiper('.hotel-slider', {
    // Optional parameters
    loop: true,

    // Navigation arrows
    navigation: {
      nextEl: '.hotel-slider__button--next',
      prevEl: '.hotel-slider__button--prev',
    },

    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
  });

  var reviewsSlider = new Swiper('.reviews-slider', {
    // Optional parameters
    loop: true,

    // Navigation arrows
    navigation: {
      nextEl: '.reviews-slider__button--next',
      prevEl: '.reviews-slider__button--prev',
    },

  });

  var menuButton = $(".menu-button");
  menuButton.on('click', function () {
    $(".navbar-bottom").toggleClass("navbar-bottom--visible");
  });

  var modalButton = $('[data-toggle="modal"]');
  var closeModalButton = $(".modal__close");
  modalButton.on('click', openModal);
  closeModalButton.on('click', closeModal);

  function openModal() {
    var targetModal = $(this).attr("data-href");
    $(targetModal).find(".modal__overlay").addClass("modal__overlay--visible");
    $(targetModal).find(".modal__dialog").addClass("modal__dialog--visible");
  }

  $(document).keyup(function (e) {
    if (e.keyCode == 27) {
      var modalOverlay = $(".modal__overlay");
      var modalDialog = $(".modal__dialog");
      modalOverlay.removeClass('modal__overlay--visible');
      modalDialog.removeClass('modal__dialog--visible');
    }
  })


  function closeModal(event) {
    event.preventDefault();
    var modalOverlay = $(".modal__overlay");
    var modalDialog = $(".modal__dialog");
    modalOverlay.removeClass('modal__overlay--visible');
    modalDialog.removeClass('modal__dialog--visible');
  }

  // валидация формы
  $(".form").each(function () {
    $(this).validate({
      errorClass: "invalid",
      messages: {
        name: {
          required: "Please specify your name",
          minlength: "The name must be more than 2 letters"
        },
        phone: {
          required: "Phone number required",
          minlength: "At least 18 characters required!"
        },
        email: {
          required: "We need your email address to contact you",
          email: "Your email address must be in the format of name@domain.com"
        },
      }
    });
  });
  $(".modal__form").validate({
    errorClass: "invalided",
    messages: {
      name: {
        required: "Please specify your name",
        minlength: "The name must not be shorter than 2 letters"
      },
      phone: {
        required: "Phone number required",
        minlength: "At least 18 characters required!"
      },
      email: {
        required: "We need your email address to contact you",
        email: "Your email address must be in the format of name@domain.com"
      },
    }
  });

});

// подключение карты Яндекс
ymaps.ready(init);

function init() {
  var myMap = new ymaps.Map("map", {
      // Координаты центра карты.
      // Порядок по умолчанию: «широта, долгота».
      // Чтобы не определять координаты центра карты вручную,
      // воспользуйтесь инструментом Определение координат.
      center: [7.838196, 98.298812],
      // Уровень масштабирования. Допустимые значения:
      // от 0 (весь мир) до 19.
      zoom: 15
    }),
    myGeoObject = new ymaps.GeoObject({
      // Описание геометрии.
      geometry: {
        type: "Point",
        coordinates: [7.838196, 98.298812],
      },
      properties: {
        // Контент метки.
        iconContent: 'HILTON PHUKET',
        hintContent: 'Временно закрыт'
      }
    }, { // Опции.
      // Иконка метки будет растягиваться под размер ее содержимого.
      preset: 'islands#darkBlueStretchyIcon',
      // Метку можно перемещать.
      draggable: true
    }),
    myPieChart = new ymaps.Placemark([7.838196, 98.298812], {
      preset: 'islands#redIcon',
      iconColor: 'red'
    });
  myMap.geoObjects
    .add(myGeoObject)
    .add(myPieChart)
}