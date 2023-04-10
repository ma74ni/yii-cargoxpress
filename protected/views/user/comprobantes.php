<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Cargo Xpress</title>

  <style>
    @media print {
      body {
        width: 21cm;
        margin: 0;

        /* change the margins as you want them to be. */
      }


      .invoice-box {
        width: 21cm;
        margin: 20px 0 0 0;
        border: 1px solid #eee;
        box-shadow: 0 0 0px rgba(0, 0, 0, .15);
        font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
        color: #555;
      }

      .invoice-box table {
        width: 100%;
        line-height: inherit;
        text-align: left;
      }

      .logopdf {
        width: 120px;
      }

      .content-headerpdf {
        text-align: center;
      }

      .content-headerpdf td {
        padding-bottom: 30px;
      }

      .headerpdf {
        font-size: 18px;
        line-height: 19px;
      }

      .content-information {
        font-size: 12px;
      }

      .content-information p, .content-information label {
        margin: 0;
      }

      .content-information tr td {
        border: 1px solid #222222;
        padding: 8px;
      }

      .content-information .font-medium {
        font-weight: bolder;
      }

      .content-sign {
        height: 130px;

      }

      .vt {
        vertical-align: top;
      }

      .br-0 {
        border-right: none !important;
      }

      .bl-0 {
        border-left: none !important;
      }
    }

    .invoice-box {
      width: 21cm;
      margin: 20px 0 0 0;
      border: 1px solid #eee;
      box-shadow: 0 0 0px rgba(0, 0, 0, .15);
      font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
      color: #555;
    }

    .invoice-box table {
      width: 100%;
      line-height: inherit;
      text-align: left;
    }

    .logopdf {
      width: 120px;
    }

    .content-headerpdf {
      text-align: center;
    }

    .content-headerpdf td {
      padding-bottom: 30px;
    }

    .headerpdf {
      font-size: 18px;
      line-height: 19px;
    }

    .content-information {
      font-size: 12px;
    }

    .content-information p, .content-information label {
      margin: 0;
    }

    .content-information tr td {
      border: 1px solid #222222;
      padding: 8px;
    }

    .content-information .font-medium {
      font-weight: bolder;
    }

    .content-sign {
      height: 130px;

    }

    .vt {
      vertical-align: top;
    }

    .br-0 {
      border-right: none !important;
    }

    .bl-0 {
      border-left: none !important;
    }

    @media only screen and (max-width: 600px) {
      .invoice-box table tr.top table td {
        width: 100%;
        display: block;
        text-align: center;
      }

      .invoice-box table tr.information table td {
        width: 100%;
        display: block;
        text-align: center;
      }

    }
  </style>
</head>
<body>
<form id="form_invoice">
  <?php if (is_array($data) && count($data) >= 1): ?>
    <script> var data = <?php echo json_encode($data); ?>;</script>
  <?php foreach ($data as $val) { ?>

  <?php if ($res = Driver ::getOrdenId($val)) { ?>
  <input
    type="hidden" id="codigo_orden_<?php echo $res['orden_id'] ?>" value="<?php echo $res['codigo_orden'] ?>"
  >
    <div class="invoice-box" id="invoice-box_<?php echo $res['orden_id'] ?>">
      <table cellpadding="0" cellspacing="0">
        <tr class="top">
          <td colspan="4">
            <table>
              <tr class="content-headerpdf">
                <td>
                  <img
                    class="logopdf"
                    src="<?php echo Yii ::app() -> getBaseUrl(true) . '/assets/images-front/logo/logopdf.png'; ?>"
                    alt=""
                  />
                </td>
                <td class="headerpdf">
                  CARGO XPRESS<br> MENSAJERÍA Y LOGÍSTICA EMPRESARIAL <br> 0999979075 <br>
                  supervisor@web-cargoxpress.com <br>
                </td>
                <td>
                  <div id="codigo_orden_barcode_<?php echo $res['orden_id'] ?>"></div>
                  <input type="hidden" class="codigo_orden">
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <table cellpadding="0" cellspacing="0" class="content-information">

        <tr class="item">
          <td width="10%">
            <label class="font-medium">Fecha y Hora</label>
          </td>
          <td width="40%">
            <p class="v date_created"><?php echo $res['date_created'] ?></p>
          </td>
          <td width="10%">
            <label class="font-medium">Tipo de Servicio</label>
          </td>
          <td width="40%">
            <p class="v tipo_servicio"><?php echo $res['tipo_servicio'] ?></p>
          </td>
        </tr>

        <tr class="item">
          <td>
            <label class="font-medium">Origen</label>
          </td>

          <td>
            <span class="v origen"><?php echo $res['origen'] ?></span>
          </td>
          <td>
            <label class="font-medium">Destino</label>
          </td>

          <td>
            <span class="v destino"><?php echo $res['destino'] ?></span>
          </td>
        </tr>
        <tr class="item">
          <td>
            <label class="font-medium">Dirección</label>
          </td>

          <td>
            <span class="v direccion_origen"><?php echo $res['direccion_origen'] ?></span>
          </td>
          <td>
            <label class="font-medium">Dirección</label>
          </td>

          <td>
            <span class="v direccion_destino"><?php echo $res['direccion_destino'] ?></span>
          </td>
        </tr>
        <tr class="item">
          <td>
            <label class="font-medium">Envía</label>
          </td>

          <td>
            <span class="v remitente"><?php echo $res['remitente'] ?></span>
          </td>
          <td>
            <label class="font-medium">Recibe</label>
          </td>

          <td>
            <span class="v recibe"><?php echo $res['recibe'] ?></span>
          </td>
        </tr>
        <tr class="item">
          <td>
            <label class="font-medium">Teléfono</label>
          </td>

          <td>
            <span class="v telefono_remitente"><?php echo $res['telefono_remitente'] ?></span>
          </td>
          <td>
            <label class="font-medium">Teléfono</label>
          </td>

          <td>
            <span class="v telefono_recibe"><?php echo $res['telefono_recibe'] ?></span>
          </td>
        </tr>
        <tr class="item">
          <td class="vt br-0">
            <label class="font-medium">Indicaciones:</label>
          </td>
          <td class="vt bl-0">
            <span class="v detalle"><?php echo $res['detalle'] ?></span>
          </td>
          <td colspan="2" class="content-sign vt">
            <label class="font-medium">Firma Recepción:</label>
          </td>
        </tr>
      </table>
      <br/><br/>
      <table cellpadding="0" cellspacing="0" class="content-information">

        <tr class="item">
          <td width="10%">
            <label class="font-medium">Fecha y Hora</label>
          </td>
          <td width="40%">
            <p class="v date_created"><?php echo $res['date_created'] ?></p>
          </td>
          <td width="10%">
            <label class="font-medium">Tipo de Servicio</label>
          </td>
          <td width="40%">
            <p class="v tipo_servicio"><?php echo $res['tipo_servicio'] ?></p>
          </td>
        </tr>

        <tr class="item">
          <td>
            <label class="font-medium">Origen</label>
          </td>

          <td>
            <span class="v origen"><?php echo $res['origen'] ?></span>
          </td>
          <td>
            <label class="font-medium">Destino</label>
          </td>

          <td>
            <span class="v destino"><?php echo $res['destino'] ?></span>
          </td>
        </tr>
        <tr class="item">
          <td>
            <label class="font-medium">Dirección</label>
          </td>

          <td>
            <span class="v direccion_origen"><?php echo $res['direccion_origen'] ?></span>
          </td>
          <td>
            <label class="font-medium">Dirección</label>
          </td>

          <td>
            <span class="v direccion_destino"><?php echo $res['direccion_destino'] ?></span>
          </td>
        </tr>
        <tr class="item">
          <td>
            <label class="font-medium">Envía</label>
          </td>

          <td>
            <span class="v remitente"><?php echo $res['remitente'] ?></span>
          </td>
          <td>
            <label class="font-medium">Recibe</label>
          </td>

          <td>
            <span class="v recibe"><?php echo $res['recibe'] ?></span>
          </td>
        </tr>
        <tr class="item">
          <td>
            <label class="font-medium">Teléfono</label>
          </td>

          <td>
            <span class="v telefono_remitente"><?php echo $res['telefono_remitente'] ?></span>
          </td>
          <td>
            <label class="font-medium">Teléfono</label>
          </td>

          <td>
            <span class="v telefono_recibe"><?php echo $res['telefono_recibe'] ?></span>
          </td>
        </tr>
        <tr class="item">
          <td class="vt br-0">
            <label class="font-medium">Indicaciones:</label>
          </td>
          <td class="vt bl-0">
            <span class="v detalle"><?php echo $res['detalle'] ?></span>
          </td>
          <td colspan="2" class="content-sign vt">
            <label class="font-medium">Firma Recepción:</label>
          </td>
        </tr>
      </table>
    </div>

  <?php } ?>
  <?php } ?>
  <?php endif; ?>
</form>

</body>
<?php
  Yii ::app() -> clientScript -> registerScriptFile(
    Yii ::app() -> baseUrl . '/assets/barcode/jquery-barcode.min.js', CClientScript::POS_END
  );
  Yii ::app() -> clientScript -> registerScriptFile(
    Yii ::app() -> baseUrl . '/assets/comprobante/js/jspdf.min.js', CClientScript::POS_END
  );
  Yii ::app() -> clientScript -> registerScriptFile(
    Yii ::app() -> baseUrl . '/assets/comprobante/js/html2canvas.min.js', CClientScript::POS_END
  );
  Yii ::app() -> clientScript -> registerScriptFile(
    Yii ::app() -> baseUrl . '/assets/comprobantes.js', CClientScript::POS_END
  );
?>
</html>
