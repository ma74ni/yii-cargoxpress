jQuery.fn.exists = function () {
  return this.length > 0;
};

var data_table;

$(document).ready(function () {
  $(document).on('click', '.show-forgot-pass', function () {
    $('#frm').hide();
    $('#frm-forgotpass').show();
  });
  $(document).on('click', '.show-login', function () {
    $('#frm-forgotpass').hide();
    $('#frm').show();
  });

  if ($('#frm_table_ordenes_user').exists()) {
    initTableOrdenesUser();
    jQuery.datetimepicker.setLocale('es');
    var hoy = moment(new Date()).format('YYYY/MM/DD');
    var ayer = moment(new Date()).add(-1, 'days').format('YYYY/MM/DD');

    $('#fecha_creacion_hasta').val(hoy);
    $('#fecha_creacion_desde').val(ayer);

    jQuery('#fecha_envio_desde').datetimepicker({
      format: 'Y/m/d',
      onShow: function (ct) {
        this.setOptions({
          maxDate: jQuery('#fecha_envio_hasta').val()
            ? jQuery('#fecha_envio_hasta').val()
            : false,
        });
      },
      timepicker: false,
      readonly: true,
    });
    jQuery('#fecha_envio_hasta').datetimepicker({
      format: 'Y/m/d',
      onShow: function (ct) {
        this.setOptions({
          minDate: jQuery('#fecha_envio_desde').val()
            ? jQuery('#fecha_envio_desde').val()
            : false,
        });
      },
      timepicker: false,
      readonly: true,
    });

    jQuery('#fecha_creacion_desde').datetimepicker({
      format: 'Y/m/d',
      onShow: function (ct) {
        this.setOptions({
          maxDate: jQuery('#fecha_creacion_hasta').val()
            ? jQuery('#fecha_creacion_hasta').val()
            : false,
        });
      },
      timepicker: false,
      readonly: true,
    });
    jQuery('#fecha_creacion_hasta').datetimepicker({
      format: 'Y/m/d',
      onShow: function (ct) {
        this.setOptions({
          minDate: jQuery('#fecha_creacion_desde').val()
            ? jQuery('#fecha_creacion_desde').val()
            : false,
        });
      },
      timepicker: false,
      readonly: true,
    });
  }

  if ($('#frm_table_contactos_user').exists()) {
    initTableContactosUser();
  }

  $(document).on('click', '.close-modal', function () {
    var id = $(this).data('id');
    $(id).modal('hide');
  });

  $(document).on('click', '.show-lang-list', function () {
    $('.lang-wrapper').slideToggle('fast');
  });

  if ($('.mobile_inputs').exists()) {
    try {
      $('.mobile_inputs').intlTelInput({
        autoPlaceholder: false,
        defaultCountry: default_country,
        autoHideDialCode: true,
        nationalMode: false,
        autoFormat: false,
        utilsScript:
          site_url + '/assets/intel/lib/libphonenumber/build/utils.js',
      });
    } catch (err) {
      dump(err.message);
    }
  }

  $.validate({
    language: jsLanguageValidator,
    form: '#frm',
    onError: function () {},
    onSuccess: function () {
      var params = $('#frm').serialize();
      var action = $('#frm #action').val();
      var button = $('#frm button[type="submit"]');
      dump(button);
      callAjax(action, params, button);
      return false;
    },
  });

  $.validate({
    language: jsLanguageValidator,
    form: '#frm_orden',
    onError: function () {
      console.log('error');
    },
    onSuccess: function () {
      const data = $('#frm_orden').serializeArray();
      var params = $('#frm_orden').serialize();
      var action = $('#frm_orden #action').val();
      var button = $('#frm_orden button[type="submit"]');
      callAjax(action, params, button);
      //this.sendOrder(data);
      return false;
    },
    sendOrder: function (params) {
      const formatedParams = params.reduce((acc, item) => {
        const key = item.name;
        return {
          ...acc,
          [key]: item.value,
        };
      }, {});
      let temp = '?????? \n';
      formatedParams.orden_id
        ? (temp += 'C??digo: ' + formatedParams.orden_id + '\n')
        : '';
      temp += `Origen: ${
        formatedParams.origen ? formatedParams.origen : ''
      } \n`;
      temp += `Direcci??n: ${
        formatedParams.direccion_origen ? formatedParams.direccion_origen : ''
      } \n`;
      temp += `Env??a: ${
        formatedParams.remitente ? formatedParams.remitente : ''
      } \n`;
      temp += `Tel??fono: ${
        formatedParams.telefono_remitente
          ? formatedParams.telefono_remitente
          : ''
      } \n`;
      temp += '______ \n';
      temp += `Destino: ${
        formatedParams.destino ? formatedParams.destino : ''
      } \n`;
      temp += `Direcci??n: ${
        formatedParams.direccion_destino ? formatedParams.direccion_destino : ''
      } \n`;
      temp += `Destinatario: ${
        formatedParams.recibe ? formatedParams.recibe : ''
      } \n`;
      temp += `Tel??fono: ${
        formatedParams.telefono_recibe ? formatedParams.telefono_recibe : ''
      } \n`;
      temp += `Gestiones: ${
        formatedParams.no_gestiones ? formatedParams.no_gestiones : ''
      } \n`;
      temp += `${formatedParams.detalle ? formatedParams.detalle : ''} \n`;

      window.open(
        'https://wa.me/+593999979075' +
          '?text=' +
          encodeURIComponent(`${temp}`),
        '_blank'
      ) ||
        window.location.replace(
          'https://wa.me/+593999979075' +
            '?text=' +
            encodeURIComponent(`${temp}`)
        );
    },
  });

  $.validate({
    language: jsLanguageValidator,
    form: '#frm_contacto',
    onError: function () {},
    onSuccess: function () {
      var params = $('#frm_contacto').serialize();
      var action = $('#frm_contacto #action').val();
      var button = $('#frm_contacto button[type="submit"]');
      dump(button);
      callAjax(action, params, button);
      return false;
    },
  });

  $.validate({
    language: jsLanguageValidator,
    form: '#frm_table_ordenes_user_busqueda',
    onError: function () {},
    onSuccess: function () {
      initTableOrdenesUserBusquedaAvanzada();
      $('#table_busqueda').modal('hide');
      return false;
    },
  });

  $.validate({
    language: jsLanguageValidator,
    form: '#frm_table_contactos_user_busqueda',
    onError: function () {},
    onSuccess: function () {
      initTableContactosUserBusquedaAvanzada();
      $('#table_busqueda').modal('hide');
      return false;
    },
  });

  $.validate({
    language: jsLanguageValidator,
    form: '#frm-forgotpass',
    onError: function () {},
    onSuccess: function () {
      var params = $('#frm-forgotpass').serialize();
      var action = $('#frm-forgotpass #action').val();
      var button = $('#frm-forgotpass button[type="submit"]');
      dump(button);
      callAjax(action, params, button);
      return false;
    },
  });

  if ($('.chosen').exists()) {
    $('.chosen').chosen({
      allow_single_deselect: true,
      width: '100%',
    });
  }

  $(document).on('click', '.details', function () {
    var id = $(this).data('id');
    var hidden_id = $(this).data('hidden_id');
    var modal_detalle = $(this).data('modal_detalle');
    dump('modal show');
    $('.' + hidden_id).val(id);
    $('.' + modal_detalle).modal({
      backdrop: 'static',
      keyboard: false,
    });
  });
  $('.detalle-orden-modal').on('show.bs.modal', function (e) {
    dump('modal totally loaded');
    dump($('.orden_id').val());
    callAjax('getDetalleOrden', 'orden_id=' + $('.orden_id').val());
  });
  $('.detalle-contacto-modal').on('show.bs.modal', function (e) {
    dump('modal totally loaded');
    dump($('.contacto_id').val());
    callAjax('getDetalleContacto', 'contacto_id=' + $('.contacto_id').val());
  });

  /*edit*/
  $(document).on('click', '.edit', function () {
    var orden_id = $(this).data('id');
    var hidden_id = $(this).data('hidden_id');
    var modal_detalle = $(this).data('modal_detalle');
    var modal_new = $(this).data('modal_new');
    dump('modal show');
    $('.' + hidden_id).val(orden_id);
    $('.' + modal_detalle).modal('hide');
    $('.' + modal_new).modal({
      backdrop: 'static',
      keyboard: false,
    });
  });

  /*task modal*/
  $('.new-orden').on('show.bs.modal', function (e) {
    var orden_id = $('.orden_id').val();
    dump(orden_id);
    if (!empty(orden_id)) {
      dump('orden_id=>' + orden_id);
      callAjax('getEditOrden', 'orden_id=' + orden_id);
    } else {
      $('#peso').val('2');
      $('#no_gestiones').val('1');
    }
  });

  $('.btn-limpiar').on('click', function (e) {
    dump('limpiar buscar form');
    e.preventDefault();
    e.stopPropagation();
    clearFormElements('#frm_table_ordenes_user_busqueda');
  });

  $('.new-orden').on('hide.bs.modal', function (e) {
    dump('hide modal');
    clearFormElements('#frm_orden');
  });

  $('.new-contacto').on('show.bs.modal', function (e) {
    var contacto_id = $('.contacto_id').val();
    dump(contacto_id);
    if (!empty(contacto_id)) {
      dump('contacto_id=>' + contacto_id);
      callAjax('getEditContacto', 'contacto_id=' + contacto_id);
    }
  });
  $('.new-contacto').on('hide.bs.modal', function (e) {
    dump('hide modal');
    clearFormElements('#frm_contacto');
  });

  $(document).on('change', '.contacto_origen', function () {
    var contacto_id = $(this).val();
    if (contacto_id == '0') {
      $('#remitente').val('');
      $('#telefono_remitente').val('');
      $('#origen').val('');
      $('#direccion_origen').val('');

      $('#zona_origen').find('option').remove();
      $('#zona_origen').append(
        '<option >Por favor seleccione una zona de la lista</option>'
      );
      $('#zona_origen').val('0');
      $('#zona_origen').trigger('chosen:updated');
      $('#ciudad_origen_id').find('option').remove();
      $('#ciudad_origen_id').append(
        '<option >Por favor seleccione una ciudad de la lista</option>'
      );
      $('#ciudad_origen_id').val('0');
      $('#ciudad_origen_id').trigger('chosen:updated');
      $('#provincia_origen_id').val('0');
      $('#provincia_origen_id').trigger('chosen:updated');
    } else {
      callAjax('loadContactInfoOrigen', 'contacto_id=' + contacto_id);
    }
  });

  $(document).on('change', '.contacto_destino', function () {
    var contacto_id = $(this).val();
    if (contacto_id == '0') {
      $('#destino').val('');
      $('#telefono_recibe').val('');
      $('#recibe').val('');
      $('#direccion_destino').val('');

      $('#zona_destino').find('option').remove();
      $('#zona_destino').append(
        '<option >Por favor seleccione una zona de la lista</option>'
      );
      $('#zona_destino').val('0');
      $('#zona_destino').trigger('chosen:updated');
      $('#ciudad_destino_id').find('option').remove();
      $('#ciudad_destino_id').append(
        '<option >Por favor seleccione una ciudad de la lista</option>'
      );
      $('#ciudad_destino_id').val('0');
      $('#ciudad_destino_id').trigger('chosen:updated');
      $('#provincia_destino_id').val('0');
      $('#provincia_destino_id').trigger('chosen:updated');
    } else {
      callAjax('loadContactInfoDestino', 'contacto_id=' + contacto_id);
    }
  });
  $(document).on('click', '#seleccionar-todos', function () {
    if(this.checked) {
      // Iterate each checkbox
      $(':checkbox').each(function() {
        this.checked = true;
      });
    } else {
      $(':checkbox').each(function() {
        this.checked = false;
      });
    }
  })
  $(document).on('change', '.provincia_origen_id', function () {
    var id = $(this).val();

    if (id == '0') {
      $('#zona_origen').val('0');
      $('#ciudad_origen_id').val('0');
    } else {
      callAjaxCiudad(
        'getCiudadList',
        'id_padre=' + id,
        'ciudad_origen_id',
        '0'
      );
    }
  });

  $(document).on('change', '.ciudad_origen_id', function () {
    var id = $(this).val();
    if (id == '0') {
      $('#zona_origen').val('0');
    } else {
      callAjaxZona('getZonaList', 'id_padre=' + id, 'zona_origen', '0');
    }
  });

  $(document).on('change', '.provincia_destino_id', function () {
    var id = $(this).val();

    if (id == '0') {
      $('#zona_destino').val('0');
      $('#ciudad_destino_id').val('0');
    } else {
      callAjaxCiudad(
        'getCiudadList',
        'id_padre=' + id,
        'ciudad_destino_id',
        '0'
      );
    }
  });

  $(document).on('change', '.ciudad_destino_id', function () {
    var id = $(this).val();
    if (id == '0') {
      $('#zona_destino').val('0');
    } else {
      callAjaxZona('getZonaList', 'id_padre=' + id, 'zona_destino', '0');
    }
  });

  $(document).on('change', '.provincia', function () {
    var id = $(this).val();

    if (id == '0') {
      $('#zona').val('0');
      $('#ciudad_id').val('0');
    } else {
      callAjaxCiudad('getCiudadList', 'id_padre=' + id, 'ciudad_id', '0');
    }
  });

  $(document).on('change', '.ciudad_id', function () {
    var id = $(this).val();
    if (id == '0') {
      $('#zona').val('0');
    } else {
      callAjaxZona('getZonaList', 'id_padre=' + id, 'zona', '0');
    }
  });

  $('ul#tabs li').click(function (e) {
    if (!$(this).hasClass('active')) {
      var tabNum = $(this).index();
      var nthChild = tabNum + 1;
      /*$("ul#tabs li.active").removeClass("active");
             $(this).addClass("active");*/

      var parent = $(this).parent().parent();
      //dump(parent);

      parent.find('ul#tabs li.active').removeClass('active');
      $(this).addClass('active');

      parent.find('ul#tab li.active').removeClass('active');
      parent.find('ul#tab li:nth-child(' + nthChild + ')').addClass('active');

      /*$("ul#tab li.active").removeClass("active");
             $("ul#tab li:nth-child("+nthChild+")").addClass("active");*/
    }
  });
}); /*end docu*/

function empty(data) {
  //if (typeof data == "undefined" || data==null || data=="" ) {
  if (
    typeof data == 'undefined' ||
    data == null ||
    data == '' ||
    data == 'null' ||
    data == 'undefined'
  ) {
    return true;
  }
  return false;
}

function dump(data) {
  console.debug(data);
}

var ajax_request;

/*mycall*/
function callAjax(action, params, button) {
  dump(ajax_url + '/' + action + '?' + params);
  params += '&language=' + language;

  ajax_request = $.ajax({
    url: ajax_url + '/' + action,
    data: params,
    type: 'post',
    //async: false,
    dataType: 'json',
    timeout: 6000,
    beforeSend: function () {
      dump('before=>');
      dump(ajax_request);
      if (ajax_request != null) {
        ajax_request.abort();
        dump('ajax abort');
        busy(false, button);
      } else {
        busy(true, button);
      }
    },
    complete: function (data) {
      ajax_request = (function () {
        return;
      })();
      dump('Completed');
      dump(ajax_request);
      busy(false, button);
    },
    success: function (data) {
      dump(data);
      if (data.code == 1) {
        switch (action) {
          case 'login':
            window.location.href = data.details;
            break;

          case 'forgotPassword':
            window.location.href = data.details;
            break;

          case 'resetPassword':
            nAlert(data.msg, 'success');
            Swal.fire({
              title: 'Exitoso',
              text: data.msg,
              icon: 'success',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Continuar',
            }).then((result) => {
              if (result.value) {
                window.location.href = data.details;
              }
            });

            break;

          case 'misPedidosFilteredList':
            nAlert(data.msg, 'success');
            break;

          case 'misContactosFilteredList':
            nAlert(data.msg, 'success');
            break;

          case 'addOrden':
            $('.new-orden').modal('hide');
            initTableOrdenesUser();
            Swal.fire({
              title: 'Exitoso',
              text: data.msg,
              icon: 'success',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ok',
            });

            break;

          case 'addContacto':
            $('.new-contacto').modal('hide');
            initTableContactosUser();
            Swal.fire({
              title: 'Exitoso',
              text: data.msg,
              icon: 'success',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ok',
            });

            break;

          case 'getDetalleOrden':
            if (data.details.estado == 'Creado') {
              $('.action-1').show();
            } else {
              $('.action-1').hide();
            }
            $('.orden_id').html(data.details.orden_id);
            $('.estado').html(
              '<span class="rounded tag ' +
                data.details.estado +
                '" >' +
                data.details.estado +
                '</spa>'
            );
            $('.date_created').html(data.details.date_created);
            $('.tipo_servicio').html(data.details.tipo_servicio);
            $('.origen').html(data.details.origen);
            $('.direccion_origen').html(data.details.direccion_origen);
            $('.ciudad_origen').html(data.details.ciudad_origen);

            $('.remitente').html(data.details.remitente);
            $('.telefono_remitente').html(data.details.telefono_remitente);
            $('.destino').html(data.details.destino);
            $('.direccion_destino').html(data.details.direccion_destino);
            $('.ciudad_destino').html(data.details.ciudad_destino);

            $('.recibe').html(data.details.recibe);
            $('.telefono_recibe').html(data.details.telefono_recibe);
            $('.origen_orden').html(data.details.origen_orden);
            $('.fecha_envio').html(data.details.fecha_envio);
            $('.codigo_orden').html(data.details.codigo_orden);
            $('.zona_origen_nombre').html(data.details.zona_origen_nombre);
            $('.zona_destino_nombre').html(data.details.zona_destino_nombre);

            $('#provincia_destino_id').val(data.details.provincia_destino_id);
            $('#provincia_origen_id').val(data.details.provincia_origen_id);

            $('#contacto_origen').val(data.details.contacto_origen);
            $('#contacto_destino').val(data.details.contacto_destino);
            $('.detalle').html(data.details.detalle);
            $('.nombres').html(data.details.nombres);
            $('.edit').removeData('id');
            $('.edit').removeData('hidden_id');
            $('.edit').removeData('modal_detalle');
            $('.edit').removeData('modal_new');

            $('.edit').attr('data-id', data.details.orden_id);
            $('.edit').attr('data-hidden_id', 'orden_id');
            $('.edit').attr('data-modal_detalle', 'detalle-orden-modal');
            $('.edit').attr('data-modal_new', 'new-orden');

            $('.imprimir-comprobante').removeData('data-id');
            $('.imprimir-comprobante').attr('data-id', data.details.orden_id);

            if (data.details.history_data.length > 0) {
              history_html = tplOrdenHistory(data.details.history_data);
              $('#orden-history').html(history_html);
            } else {
              dump('no history');
              $('#orden-history').html(
                '<p class="alert alert-danger">' + jslang.no_history + '</p>'
              );
            }

            if ($('#codigo_orden_barcode').exists()) {
              var settings = {
                bgColor: '#f1f1f1',
              };
              $('#codigo_orden_barcode').barcode(
                data.details.codigo_orden, // Value barcode (dependent on the type of barcode)

                'code128', // type (string)
                settings
              );
              $('#codigo_orden_barcode2').barcode(
                data.details.codigo_orden, // Value barcode (dependent on the type of barcode)

                'code128', // type (string)
                settings
              );
              $('#codigo_orden_barcode3').barcode(
                data.details.codigo_orden, // Value barcode (dependent on the type of barcode)

                'code128', // type (string)
                settings
              );
            }

            if ($('#form_invoice').exists()) {
              $('body').scrollTop(0);
              //createPDF();
            }

            break;

          case 'getEditOrden':
            $('#estado').val(data.details.estado);
            $('#date_created').val(data.details.date_created);
            $('#detalle').val(data.details.detalle);
            if (data.details.tipo_servicio == 'Envio Xpress') {
              $('input:radio[name="tipo_servicio"][value="Envio Xpress"]').prop(
                'checked',
                true
              );
            } else if (data.details.tipo_servicio == 'Envio Basico') {
              $('input:radio[name="tipo_servicio"][value="Envio Basico"]').prop(
                'checked',
                true
              );
            } else if (data.details.tipo_servicio == 'Delivery') {
              $('input:radio[name="tipo_servicio"][value="Delivery"]').prop(
                'checked',
                true
              );
            }
            $('#origen').val(data.details.origen);
            $('#orden_id').val(data.details.orden_id);
            $('#direccion_origen').val(data.details.direccion_origen);
            $('#ciudad_origen').val(data.details.ciudad_origen);

            $('#remitente').val(data.details.remitente);
            $('#telefono_remitente').val(data.details.telefono_remitente);
            $('#destino').val(data.details.destino);
            $('#direccion_destino').val(data.details.direccion_destino);
            $('#ciudad_destino').val(data.details.ciudad_destino);

            $('#recibe').val(data.details.recibe);
            $('#telefono_recibe').val(data.details.telefono_recibe);
            $('#origen_orden').val(data.details.origen_orden);
            $('#fecha_envio').val(data.details.fecha_envio);
            $('#codigo_orden').val(data.details.codigo_orden);
            $('#provincia_destino_id').val(data.details.provincia_destino_id);
            $('#provincia_origen_id').val(data.details.provincia_origen_id);
            $('#provincia_destino_id').trigger('chosen:updated');
            $('#provincia_origen_id').trigger('chosen:updated');

            $('#contacto_origen').val(data.details.contacto_origen);
            $('#contacto_destino').val(data.details.contacto_destino);
            //
            $('#contacto_origen').trigger('chosen:updated');
            $('#contacto_destino').trigger('chosen:updated');
            //lleno dropdowns origen
            if (data.details.provincia_origen_id == '0') {
              $('#zona_origen').val('0');
              $('#ciudad_origen_id').val('0');
            } else {
              callAjaxCiudad(
                'getCiudadList',
                'id_padre=' + data.details.provincia_origen_id,
                'ciudad_origen_id',
                data.details.ciudad_origen_id
              );
            }

            if (data.details.ciudad_origen_id == '0') {
              $('#zona_origen').val('0');
            } else {
              callAjaxZona(
                'getZonaList',
                'id_padre=' + data.details.ciudad_origen_id,
                'zona_origen',
                data.details.zona_origen
              );
            }

            if (data.details.provincia_destino_id == '0') {
              $('#zona_destino').val('0');
              $('#ciudad_destino_id').val('0');
            } else {
              callAjaxCiudad(
                'getCiudadList',
                'id_padre=' + data.details.provincia_destino_id,
                'ciudad_destino_id',
                data.details.ciudad_destino_id
              );
            }

            if (data.details.ciudad_destino_id == '0') {
              $('#zona_destino').val('0');
            } else {
              callAjaxZona(
                'getZonaList',
                'id_padre=' + data.details.ciudad_destino_id,
                'zona_destino',
                data.details.zona_destino
              );
            }

            break;

          case 'loadContactInfoOrigen':
            $('#origen').val(data.details.empresa);
            $('#direccion_origen').val(data.details.direccion);
            $('#remitente').val(data.details.contacto);
            $('#telefono_remitente').val(data.details.telefono);
            $('#provincia_origen_id').val(data.details.provincia_id);
            $('#provincia_origen_id').trigger('chosen:updated');
            if (data.details.provincia_id == '0') {
              $('#zona_origen').val('0');
              $('#ciudad_origen_id').val('0');
            } else {
              callAjaxCiudad(
                'getCiudadList',
                'id_padre=' + data.details.provincia_id,
                'ciudad_origen_id',
                data.details.ciudad_id
              );
            }

            if (data.details.ciudad_id == '0') {
              $('#zona_origen').val('0');
            } else {
              callAjaxZona(
                'getZonaList',
                'id_padre=' + data.details.ciudad_id,
                'zona_origen',
                data.details.zona
              );
            }

            break;

          case 'loadContactInfoDestino':
            $('#destino').val(data.details.empresa);
            $('#direccion_destino').val(data.details.direccion);
            $('#recibe').val(data.details.contacto);
            $('#telefono_recibe').val(data.details.telefono);
            $('#provincia_destino_id').val(data.details.provincia_id);
            $('#provincia_destino_id').trigger('chosen:updated');
            if (data.details.provincia_id == '0') {
              $('#zona_destino').val('0');
              $('#ciudad_destino_id').val('0');
            } else {
              callAjaxCiudad(
                'getCiudadList',
                'id_padre=' + data.details.provincia_id,
                'ciudad_destino_id',
                data.details.ciudad_id
              );
            }

            if (data.details.ciudad_id == '0') {
              $('#zona_destino').val('0');
            } else {
              callAjaxZona(
                'getZonaList',
                'id_padre=' + data.details.ciudad_id,
                'zona_destino',
                data.details.zona
              );
            }

            break;

          case 'getDetalleContacto':
            $('.contacto_id').html(data.details.contacto_id);
            $('.empresa').html(data.details.empresa);
            $('.direccion').html(data.details.direccion);
            $('.ciudad').html(data.details.ciudad);
            $('.contacto').html(data.details.contacto);
            $('.telefono').html(data.details.telefono);
            $('.email').html(data.details.email);
            $('.identificacion').html(data.details.identificacion);
            $('.sector').html(data.details.sector);
            $('.edit').removeData('id');
            $('.edit').removeData('hidden_id');
            $('.edit').removeData('modal_detalle');
            $('.edit').removeData('modal_new');
            $('.delete').removeData('id');
            $('.delete').removeData('data');
            $('.delete').removeData('modal_detalle');

            $('.edit').attr('data-id', data.details.contacto_id);
            $('.edit').attr('data-hidden_id', 'contacto_id');
            $('.edit').attr('data-modal_detalle', 'detalle-contacto-modal');
            $('.edit').attr('data-modal_new', 'new-contacto');
            $('.delete').attr('data-id', data.details.contacto_id);
            $('.delete').attr(
              'data-data',
              'id=' +
                data.details.contacto_id +
                '&tbl=contactos&whereid=contacto_id'
            );
            $('.delete').attr('data-modal_detalle', 'detalle-contacto-modal');

            break;

          case 'getEditContacto':
            $('#empresa').val(data.details.empresa);
            $('#contacto_id').val(data.details.contacto_id);
            $('#direccion').val(data.details.direccion);
            $('#ciudad_id').val(data.details.ciudad_id);

            $('#contacto').val(data.details.contacto);
            $('#telefono').val(data.details.telefono);
            $('#email').val(data.details.email);
            $('#identificacion').val(data.details.identificacion);

            $('#provincia').val(data.details.provincia);
            $('#provincia').trigger('chosen:updated');

            //lleno dropdowns origen
            if (data.details.provincia == '0') {
              $('#zona').val('0');
              $('#ciudad').val('0');
            } else {
              callAjaxCiudad(
                'getCiudadList',
                'id_padre=' + data.details.provincia,
                'ciudad_id',
                data.details.ciudad_id
              );
            }

            if (data.details.ciudad == '0') {
              $('#zona').val('0');
            } else {
              callAjaxZona(
                'getZonaList',
                'id_padre=' + data.details.ciudad_id,
                'zona',
                data.details.zona
              );
            }

            break;

          case 'deleteRecords':
            tableReload();

            break;
          case 'getClipboardOrden':
            const el = document.createElement('textarea');
            var str = '';
            str += '*******\n';
            str += 'C??digo: ' + data.details.codigo_orden + '\n';
            str += 'Origen: ' + data.details.origen + '\n';
            str += 'Direcci??n: ' + data.details.direccion_origen + '\n';
            str += 'Env??a: ' + data.details.remitente + '\n';
            str += 'Tel??fono: ' + data.details.telefono_remitente + '\n';
            str += '________________\n';
            str += 'Destino: ' + data.details.destino + '\n';
            str += 'Direcci??n: ' + data.details.direccion_destino + '\n';
            str += 'Destinatario: ' + data.details.recibe + '\n';
            str += 'Tel??fono: ' + data.details.telefono_recibe + '\n';
            str += 'Gestiones\n';
            str += data.details.detalle;
            el.value = str;
            el.setAttribute('readonly', '');
            el.style.position = 'absolute';
            el.style.left = '-9999px';
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            nAlert('Orden copiada en el portapapeles', 'success');

            break;
          default:
            nAlert(data.msg, 'success');
            break;
        }
      } else {
        // failed mycon
        switch (action) {
          default:
            nAlert(data.msg, 'warning');
            break;
        }
      }
    },
    error: function (request, error) {},
  });
}

function tableReload() {
  data_table.fnReloadAjax();
}

function callAjaxCiudad(action, params, ciudad, id) {
  dump(ajax_url + '/' + action + '?' + params);

  params += '&language=' + language;

  ajax_request = $.ajax({
    url: ajax_url + '/' + action,
    data: params,
    type: 'post',
    //async: false,
    dataType: 'json',
    timeout: 6000,
    complete: function (data) {
      ajax_request = (function () {
        return;
      })();
      dump('Completed');
      dump(ajax_request);
    },
    success: function (data) {
      dump(data);
      if (data.code == 1) {
        var $select = $('#' + ciudad);
        $select.find('option').remove();
        $select.append(
          '<option >Por favor seleccione una ciudad de la lista</option>'
        );
        $select.val('0');
        $.each(data.details, function (key, value) {
          $select.append(
            '<option value=' + value.id + '>' + value.nombre + '</option>'
          );
        });

        if (id != '0') {
          $select.val(id);
        }
        $select.trigger('chosen:updated');
      } else {
        // failed mycon
        nAlert(data.msg, 'warning');
      }
    },
    error: function (request, error) {},
  });
}

function callAjaxZona(action, params, zona, id) {
  dump(ajax_url + '/' + action + '?' + params);
  params += '&language=' + language;
  ajax_request = $.ajax({
    url: ajax_url + '/' + action,
    data: params,
    type: 'post',
    //async: false,
    dataType: 'json',
    timeout: 6000,
    complete: function (data) {
      ajax_request = (function () {
        return;
      })();
      dump('Completed');
      dump(ajax_request);
    },
    success: function (data) {
      dump(data);
      if (data.code == 1) {
        var $select = $('#' + zona);
        $select.find('option').remove();
        $select.append(
          '<option >Por favor seleccione una zona de la lista</option>'
        );
        $select.val('0');
        $.each(data.details, function (key, value) {
          $select.append(
            '<option value=' + value.id + '>' + value.zona + '</option>'
          );
        });
        if (id != '0') {
          $select.val(id);
        }
        $select.trigger('chosen:updated');
      } else {
        // failed mycon

        nAlert(data.msg, 'warning');
      }
    },
    error: function (request, error) {},
  });
}

function tplOrdenHistory(data) {
  if (data.length <= 0) {
    return;
  }
  var html = '';
  $.each(data, function (key, val) {
    dump(val);
    html += '<div class="grey-box top10">';
    html += '<div class="row">';
    html += '<div class="col-md-2">';
    html +=
      '<span class="tag rounded ' + val.estado + '">' + val.estado + '</span>';
    html += '</div>';
    html += '<div class="col-md-6">';
    html += val.detalle;

    if (!empty(val.usuario_id)) {
      html +=
        '<p class="text-muted"> Actualizado por el usuario Admin: ' +
        val.nombre_u +
        ' ' +
        val.apellido_u +
        '</p>';
    }

    if (!empty(val.cliente_id)) {
      html +=
        '<p class="text-muted"> Actualizado por el usuario Cliente: ' +
        val.nombre_c +
        ' ' +
        val.apellido_c +
        '</p>';
    }

    html += '</div>';
    html += '<div class="col-md-4">';
    html +=
      '<i class="ion-ios-clock-outline"></i> ' + val.date_created + ' <br/>';
    html += '</div>';
    html += '</div> ';
    html += '</div>';
  });
  return html;
}

function busy(e, button) {
  if (e) {
    $('body').css('cursor', 'wait');
  } else $('body').css('cursor', 'auto');
  if (e) {
    dump('busy loading');
    /*NProgress.set(0.0);		
         NProgress.inc(); */
    $('.main-preloader').show();
    if (!empty(button)) {
      button.css({ 'pointer-events': 'none' });
    }
  } else {
    dump('done loading');
    $('.main-preloader').hide();
    //NProgress.done();
    if (!empty(button)) {
      button.css({ 'pointer-events': 'auto' });
    }
  }
}

function initTableOrdenesUser() {
  var params = $('#frm_table_ordenes_user').serialize();
  var action = $('#frm_table_ordenes_user #action').val();
  params += '&language=' + language;

  if ($.fn.dataTable.isDataTable('#table_list')) {
    table = $('#table_list_mn').DataTable();
    table.destroy();
  }

  data_table = $('#table_list_mn').dataTable({
    iDisplayLength: 20,
    bProcessing: true,
    bServerSide: true,
    sAjaxSource:
      ajax_url + '/' + action + '/?currentController=admin&' + params,
    aaSorting: [[0, 'DESC']],
    sPaginationType: 'full_numbers',
    responsive: true,
    //"bFilter":false,
    columns: [
      { orderable: false },
      null,
      null,
      null,
      null,
        null,
        null,
        null,
      { orderable: false },
        null
    ],
    bLengthChange: false,
    oLanguage: {
      sProcessing: '<p>Procesando.. <i class="fa fa-spinner fa-spin"></i></p>',
    },
    aoColumnDefs: [
      {
        bSortable: false,
        aTargets: [ -1 ]
      }
    ],
    oLanguage: {
      sEmptyTable: js_lang.tablet_1,
      sInfo: js_lang.tablet_2,
      sInfoEmpty: js_lang.tablet_3,
      sInfoFiltered: js_lang.tablet_4,
      sInfoPostFix: '',
      sInfoThousands: ',',
      sLengthMenu: js_lang.tablet_5,
      sLoadingRecords: js_lang.tablet_6,
      sProcessing: js_lang.tablet_7,
      sSearch: js_lang.tablet_8,
      sZeroRecords: js_lang.tablet_9,
      oPaginate: {
        sFirst: js_lang.tablet_10,
        sLast: js_lang.tablet_11,
        sNext: js_lang.tablet_12,
        sPrevious: js_lang.tablet_13,
      },
      oAria: {
        sSortAscending: js_lang.tablet_14,
        sSortDescending: js_lang.tablet_15,
      },
    },
    fnInitComplete: function (oSettings, json) {},
    fnDrawCallback: function (oSettings) {
      dump('fnDrawCallback');
    },
  });
}

function initTableOrdenesUserBusquedaAvanzada() {
  var params = $('#frm_table_ordenes_user_busqueda').serialize();
  var action = $('#frm_table_ordenes_user_busqueda #action').val();
  params += '&language=' + language;
  if ($.fn.dataTable.isDataTable('#table_list')) {
    table = $('#table_list').DataTable();
    table.destroy();
  }

  data_table = $('#table_list').dataTable({
    iDisplayLength: 20,
    bProcessing: true,
    bServerSide: true,
    sAjaxSource:
      ajax_url + '/' + action + '/?currentController=admin&' + params,
    aaSorting: [[0, 'DESC']],
    sPaginationType: 'full_numbers',

    responsive: true,
    //"bFilter":false,
    bLengthChange: false,
    oLanguage: {
      sProcessing: '<p>Procesando.. <i class="fa fa-spinner fa-spin"></i></p>',
    },
    oLanguage: {
      sEmptyTable: js_lang.tablet_1,
      sInfo: js_lang.tablet_2,
      sInfoEmpty: js_lang.tablet_3,
      sInfoFiltered: js_lang.tablet_4,
      sInfoPostFix: '',
      sInfoThousands: ',',
      sLengthMenu: js_lang.tablet_5,
      sLoadingRecords: js_lang.tablet_6,
      sProcessing: js_lang.tablet_7,
      sSearch: js_lang.tablet_8,
      sZeroRecords: js_lang.tablet_9,
      oPaginate: {
        sFirst: js_lang.tablet_10,
        sLast: js_lang.tablet_11,
        sNext: js_lang.tablet_12,
        sPrevious: js_lang.tablet_13,
      },
      oAria: {
        sSortAscending: js_lang.tablet_14,
        sSortDescending: js_lang.tablet_15,
      },
    },
    fnInitComplete: function (oSettings, json) {},
    fnDrawCallback: function (oSettings) {
      dump('fnDrawCallback');
    },
  });
}

function initTableContactosUser() {
  var params = $('#frm_table_contactos_user').serialize();
  var action = $('#frm_table_contactos_user #action').val();
  params += '&language=' + language;

  if ($.fn.dataTable.isDataTable('#table_list')) {
    table = $('#table_list').DataTable();
    table.destroy();
  }

  data_table = $('#table_list').dataTable({
    iDisplayLength: 20,
    bProcessing: true,
    bServerSide: true,
    sAjaxSource:
      ajax_url + '/' + action + '/?currentController=admin&' + params,
    aaSorting: [[0, 'DESC']],
    sPaginationType: 'full_numbers',
    responsive: true,
    //"bFilter":false,
    bLengthChange: false,
    oLanguage: {
      sProcessing: '<p>Procesando.. <i class="fa fa-spinner fa-spin"></i></p>',
    },
    oLanguage: {
      sEmptyTable: js_lang.tablet_1,
      sInfo: js_lang.tablet_2,
      sInfoEmpty: js_lang.tablet_3,
      sInfoFiltered: js_lang.tablet_4,
      sInfoPostFix: '',
      sInfoThousands: ',',
      sLengthMenu: js_lang.tablet_5,
      sLoadingRecords: js_lang.tablet_6,
      sProcessing: js_lang.tablet_7,
      sSearch: js_lang.tablet_8,
      sZeroRecords: js_lang.tablet_9,
      oPaginate: {
        sFirst: js_lang.tablet_10,
        sLast: js_lang.tablet_11,
        sNext: js_lang.tablet_12,
        sPrevious: js_lang.tablet_13,
      },
      oAria: {
        sSortAscending: js_lang.tablet_14,
        sSortDescending: js_lang.tablet_15,
      },
    },
    fnInitComplete: function (oSettings, json) {},
    fnDrawCallback: function (oSettings) {
      dump('fnDrawCallback');
    },
  });
}

function initTableContactosUserBusquedaAvanzada() {
  var params = $('#frm_table_contactos_user_busqueda').serialize();
  var action = $('#frm_table_contactos_user_busqueda #action').val();
  params += '&language=' + language;
  if ($.fn.dataTable.isDataTable('#table_list')) {
    table = $('#table_list').DataTable();
    table.destroy();
  }

  data_table = $('#table_list').dataTable({
    iDisplayLength: 20,
    bProcessing: true,
    bServerSide: true,
    sAjaxSource:
      ajax_url + '/' + action + '/?currentController=admin&' + params,
    aaSorting: [[0, 'DESC']],
    sPaginationType: 'full_numbers',
    responsive: true,
    //"bFilter":false,
    bLengthChange: false,
    oLanguage: {
      sProcessing: '<p>Procesando.. <i class="fa fa-spinner fa-spin"></i></p>',
    },
    oLanguage: {
      sEmptyTable: js_lang.tablet_1,
      sInfo: js_lang.tablet_2,
      sInfoEmpty: js_lang.tablet_3,
      sInfoFiltered: js_lang.tablet_4,
      sInfoPostFix: '',
      sInfoThousands: ',',
      sLengthMenu: js_lang.tablet_5,
      sLoadingRecords: js_lang.tablet_6,
      sProcessing: js_lang.tablet_7,
      sSearch: js_lang.tablet_8,
      sZeroRecords: js_lang.tablet_9,
      oPaginate: {
        sFirst: js_lang.tablet_10,
        sLast: js_lang.tablet_11,
        sNext: js_lang.tablet_12,
        sPrevious: js_lang.tablet_13,
      },
      oAria: {
        sSortAscending: js_lang.tablet_14,
        sSortDescending: js_lang.tablet_15,
      },
    },
    fnInitComplete: function (oSettings, json) {},
    fnDrawCallback: function (oSettings) {
      dump('fnDrawCallback');
    },
  });
}

$(document).on('click', '.add-new-orden', function () {
  if (account_status == 'expired') {
    nAlert(jslang.account_expired, 'warning');
  } else {
    $('.orden_id').val('');
    $('.new-orden').modal({
      backdrop: 'static',
      keyboard: false,
    });
  }
});

$(document).on('click', '.add-new-contacto', function () {
  if (account_status == 'expired') {
    nAlert(jslang.account_expired, 'warning');
  } else {
    $('.contacto_id').val('');
    $('.new-contacto').modal({
      backdrop: 'static',
      keyboard: false,
    });
  }
});

$(document).on('click', '#btn_busqueda_avanzada', function () {
  $('#table_busqueda').modal({
    backdrop: 'static',
    keyboard: false,
  });
});

function nAlert(msg, alert_type) {
  var n = noty({
    text: msg,
    type: alert_type,
    theme: 'relax',
    layout: 'topCenter',
    timeout: 3000,
    animation: {
      open: 'animated fadeInDown', // Animate.css class names
      close: 'animated fadeOut', // Animate.css class names
    },
  });
}

function clearFormElements(ele) {
  $(ele)
    .find(':input')
    .each(function () {
      switch (this.type) {
        case 'password':
        case 'select-multiple':
        case 'select-one':
        case 'text':
        case 'textarea':
          $(this).val('');
          break;
        case 'checkbox':
        case 'radio':
          this.checked = false;
      }
    });
}

$(document).ready(function () {
  $(document).on('click', '.table-edit', function () {
    var id = $(this).data('modal');
    dump($(this).data('id'));
    $('#id').val($(this).data('id'));
    $(id).modal({
      backdrop: 'static',
      keyboard: false,
    });
  });
  $(document).on('click', '.delete', function () {
    dump(jslang);
    var modal_detalle = $(this).data('modal_detalle');

    Swal.fire({
      title: 'Est?? seguro?',
      text: 'Eliminaci??n del registro!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'S??',
    }).then((result) => {
      if (result.value) {
        callAjax('deleteRecords', $(this).data('data'));
        $('.' + modal_detalle).modal('hide');
      }
    });
  });
  $(document).on('click', '.refresh-table', function () {
    tableReload();
  });
  /*missing translation*/
  var today_date = moment().format('YYYY/MM/DD');
  if ($('.datetimepicker').exists()) {
    dump('datetimepicker exists');
    dump(today_date);
    $('.datetimepicker').datetimepicker({
      /*format:'Y-m-d g:i A',
             formatTime:'g:i A', */
      //format:'d.m.Y H:i'
      formatTime: 'g:i A',
      format: 'Y-m-d H:i',
      minDate: today_date,
    });
  }

  if ($('#calendar').exists()) {
    $('#calendar').datetimepicker({
      timepicker: false,
      format: 'd M Y',
      //onChangeDateTime:function(dp,$input){
      onSelectDate: function (dp, $input) {
        var date_formated = dp.format('YYYY-MM-DD');
        dump(date_formated);
        $('.calendar_formated').val(date_formated);
        loadDashboardTask();
      },
    });
  }

  if (!empty(calendar_language)) {
    jQuery.datetimepicker.setLocale(calendar_language);
    //http://xdsoft.net/jqplugins/datetimepicker/#lang*/
  }

  if ($('.dashboard-work-area').exists()) {
    loadDashboardTask();
    if (disabled_auto_refresh != 1) {
      //dashboard_task_handle = setInterval(function(){loadDashboardTaskSilent()}, 9000);
    }
  }

  /*show reason text area*/
  $(document).on('change', '.status_task_change', function () {
    var status = $(this).val();
    switchReason(status);
  });
  /*load agent list*/
  if ($('.agent-active').exists()) {
    loadAgentDashboardSilent();
    //dashboard_agent_handle = setInterval(function(){loadAgentDashboardSilent()}, 8500);
  }

  if ($('.sticky').exists()) {
    dump('sticky');
    $('.sticky').sticky({ topSpacing: 0 });
  }

  $('.switch-boostrap').bootstrapSwitch({
    size: 'mini',
  });
  if ($('#jplayer').exists()) {
    initJplayer();
  }

  $(document).on('click', '.menu-sound', function () {
    var f = $(this).find('i');
    if (f.hasClass('ion-android-volume-off')) {
      f.removeClass('ion-android-volume-off');
      f.addClass('ion-volume-high');
      dump('on');
      Cookies.set('drv_sound_on', '1', { expires: 500, path: '/' });
    } else {
      f.addClass('ion-android-volume-off');
      f.removeClass('ion-volume-high');
      dump('off');
      Cookies.set('drv_sound_on', '2', { expires: 500, path: '/' });
    }
  });
}); /*end docu*/

function loadDashboardTask() {
  if ($('.dashboard-work-area').exists()) {
    //callAjax("getDashboardTask","status=unassigned&date="+ $(".calendar_formated").val() );
    //callAjax("getDashboardTask", getParamsMap());
  }
  if ($('.task-list-area').exists()) {
    tableReload();
  }
}

function switchReason(status) {
  dump(status);
  switch (status) {
    case 'failed':
    case 'canceled':
    case 'cancelled':
      $('.reason_wrap').show();
      break;
    default:
      $('.reason_wrap').hide();
      break;
  }
}

function scroll(id) {
  if ($(id)) {
    $('.content_main').animate({ scrollTop: $(id).offset().top - 100 }, 'slow');
  }
}

var notification_handle = '';
$(document).ready(function () {
  if ($('#layout_1').exists()) {
    //        getInitialNotifications();
    //        setTimeout('getNotifications()', 1100);
    //para agregar notificaciones, se deja en suspenso ya que no est?? en los requerimientos
  }
}); /*end docu*/
function getInitialNotifications() {
  action = 'getInitialNotifications';
  params = '';
  params += '&language=' + language;
  var notification_handle2;
  notification_handle2 = $.ajax({
    url: ajax_url + '/' + action,
    data: params,
    type: 'post',
    dataType: 'json',
    timeout: 6000,
    beforeSend: function () {
      if (notification_handle2 != null) {
        notification_handle2.abort();
        dump('ajax abort');
      }
    },
    complete: function (data) {
      notification_handle2 = (function () {
        return;
      })();
    },
    success: function (data) {
      if (data.code == 1) {
        $.each(data.details, function (key, val) {
          fillPopUpNotification(
            val.message,
            val.title,
            val.task_id,
            val.status
          );
        });
      } else {
        $('#notification_list').prepend(
          '<p class="no-noti text-info">' + jslang.no_notification + '</p>'
        );
      }
    },
    error: function (request, error) {},
  });
}

function getNotifications() {
  action = 'GetNotifications';
  params = '';
  params += '&language=' + language;
  notification_handle = $.ajax({
    url: ajax_url + '/' + action,
    data: params,
    type: 'post',
    dataType: 'json',
    timeout: 6000,
    beforeSend: function () {
      window.clearInterval(notification_handle);
    },
    complete: function (data) {
      notification_handle = setInterval(function () {
        getNotifications();
      }, 10000);
    },
    success: function (data) {
      if (data.code == 1) {
        $('.no-noti').remove();
        playNotification();
        $.each(data.details, function (key, val) {
          toastMessage(val.message, val.title);
          fillPopUpNotification(
            val.message,
            val.title,
            val.task_id,
            val.status
          );
        });
      } else {
        //playNotification();
      }
    },
    error: function (request, error) {
      window.clearInterval(notification_handle);
    },
  });
}

function fillPopUpNotification(message, title, task_id, status) {
  var link =
    '<a data-id="' +
    task_id +
    '" class="detalle-orden" href="javascript:;">' +
    task_id +
    '</a>';
  var new_title = status + ' ' + jslang.task_id + ':' + link;
  var html = '';
  html += '<li>';
  html +=
    '<i class="ion-ios-circle-filled"></i> ' + message + ' <br/>' + new_title;
  html += '</li>';
  $('#notification_list').prepend(html);
}

function toastMessage(message, title) {
  if (empty(title)) {
    title = '';
  }
  if (empty(message)) {
    return;
  }
  toastr.options = {
    positionClass: 'toast-bottom-right',
    preventDuplicates: false,
    onclick: null,
    showDuration: '500',
    hideDuration: '1000',
    timeOut: '5000',
    extendedTimeOut: '1000',
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut',
  };
  toastr.info(message, title);
}

function initJplayer() {
  //alert(site_url+"/assets/audio/fb-alert.mp3");
  $('#jplayer').jPlayer({
    ready: function () {
      $(this).jPlayer('setMedia', {
        mp3: website_url + '/assets/audio/fb-alert.mp3',
      });
    },
    swfPath: site_url + '/assets/jplayer',
    loop: false,
  });
}

function playNotification() {
  var drv_sound_on = Cookies.get('drv_sound_on');
  if (drv_sound_on == 2) {
    // do nothing
    dump('sound is off');
  } else {
    dump('sound is on');
    $('#jplayer').jPlayer('play');
  }
}

$(document).ready(function () {
  $(document).on('keyup', '.numeric_only', function () {
    this.value = this.value.replace(/[^0-9\.]/g, '');
  });
}); /*end docu*/

$(document).ready(function () {
  if ($('#upload-driver-photo').exists()) {
    var uploader = new ss.SimpleUpload({
      button: 'upload-driver-photo', // HTML element used as upload button
      url: ajax_url + '/uploadprofilephoto', // URL of server-side upload handler
      name: 'uploadfile', // Parameter name of the uploaded file
      responseType: 'json',
      allowedExtensions: ['jpeg', 'png', 'jpg', 'gif'],
      maxSize: 11024, // kilobytes
      onExtError: function (filename, extension) {
        nAlert('Invalid File extennsion', 'warning');
      },
      onSizeError: function (filename, fileSize) {
        nAlert('Invalid File size', 'warning');
      },
      onSubmit: function (filename, extension) {
        busy(true);
      },
      onComplete: function (filename, response) {
        dump(response);
        busy(false);
        if (response.code == 1) {
          nAlert(response.msg, 'success');
          $('#profile_photo').val(filename);
          var image = '<img src="' + response.details + '" />';
          $('.profile-photo').html(image);
        } else {
          nAlert(response.msg, 'warning');
        }
      },
    });
  }
}); /*end doc*/

$(document).ready(function () {
  $(document).on('click', '.mobile-nav-menu', function () {
    $('.parent-wrapper .content_1.white').toggle('fast', function () {
      if (
        $(this).attr('style') == 'display: block;' ||
        $(this).attr('style') == 'display:block;'
      ) {
        $('.content_main').addClass('margin-left');
      } else {
        $('.content_main').removeClass('margin-left');
      }
    });
  });
});
/*end docu*/
/* END DOCU*/
