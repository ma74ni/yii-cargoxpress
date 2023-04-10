
<div class="modal new-orden" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

            <div class="modal-header">
                <h4 id="myLargeModalLabel" class="modal-title">
                    <?php echo t("Orden") ?>
                </h4> 
                <button aria-label="Cerrar" data-dismiss="modal" class="close" type="button">
                    <span aria-hidden="true"><i class="ion-android-close"></i></span>
                </button> 

            </div>  

            <div class="modal-body">

                <form id="frm_orden" class="frm" method="POST" onsubmit="return false;">
                    <?php
                    echo CHtml::hiddenField('action', 'addOrden');
                    echo CHtml::hiddenField('orden_id', '', array(
                        'class' => "orden_id"
                    ));
                    echo CHtml::hiddenField('estado', '', array(
                        'class' => "estado"
                    ));
                    echo CHtml::hiddenField('cliente_id', 'addOrden');
                    ?>
                    <div class="row">
                        <div class="col-md-12 ">

                            <h5><?php echo Driver::t("Indicaciones") ?></h5>
                            <div class="top10">
                                <?php
                                echo CHtml::textArea('detalle', '', array(
                                    'class' => "",
                                    'required' => true
                                ))
                                ?>
                            </div>
                            <div class="top10 row">
                                <div class="col-md-12 ">
                                    <div class="form-group left-form-group">
                                        <label class="font-medium"><?php echo Driver::t("Código") ?> :</label>
                                        <span class="v codigo_orden" id="codigo_orden"></span>
                                    </div>
                                </div>
                                <div class="col-md-4 ">
                                    <?php
                                    echo CHtml::radioButton('tipo_servicio', false, array(
                                        'class' => "tipo_servicio",
                                        'value' => 'Envio Xpress',
                                        'required' => true
                                    ));
                                    ?>
                                    <span><?php echo Driver::t("Envio Xpress") ?></span>
                                </div>
                                <div class="col-md-4 ">
                                    <?php
                                    echo CHtml::radioButton('tipo_servicio', false, array(
                                        'class' => "tipo_servicio",
                                        'value' => "Envio Basico"
                                    ));
                                    ?>
                                    <span><?php echo Driver::t("Envio Basico") ?></span>
                                </div> <!--col-->
                                  <div class="col-md-4 ">
                                    <?php
                                    echo CHtml::radioButton('tipo_servicio', false, array(
                                        'class' => "tipo_servicio",
                                        'value' => "Ilimitado"
                                    ));
                                    ?>
                                    <span><?php echo Driver::t("Ilimitado") ?></span>
                                </div> <!--col-->
                            </div> <!--row-->
                            <div class="row top10">
                                <div class="col-md-3 ">
                                    <label class="font-medium"><?php echo Driver::t("Peso") ?></label>
                                    <?php
                                    echo CHtml::textField('peso', '', array(
                                        'placeholder' => Driver::t("Peso"),
                                        'class' => "validate numeric_only",
                                        'data-validation' => "required",
                                        'maxlength' => '3'
                                    ))
                                    ?>
                                </div> <!--col-->
                                <div class="col-md-3 ">
                                    <label class="font-medium"><?php echo Driver::t("Número de Gestiones") ?></label>
                                    <?php
                                    echo CHtml::textField('no_gestiones', '', array(
                                        'placeholder' => Driver::t("Número de Gestiones"),
                                        'class' => "validate numeric_only",
                                        'data-validation' => "required",
                                        'maxlength' => '3'
                                    ))
                                    ?>
                                </div> <!--col-->
                                <div class="col-md-3 ">
                                    <label class="font-medium"><?php echo Driver::t("Tarifa") ?></label>
                                    <?php
                                    echo CHtml::textField('tarifa', '', array(
                                        'placeholder' => Driver::t("Tarifa"),
                                        'class' => "validate numeric_only",
                                        'data-validation' => "required",
                                        'maxlength' => '4'
                                    ))
                                    ?>
                                </div> <!--col-->
                                <div class="col-md-3 ">
                                    <label class="font-medium"><?php echo Driver::t("Costo") ?></label>
                                    <?php
                                    echo CHtml::textField('costo', '', array(
                                        'placeholder' => Driver::t("Costo"),
                                        'class' => "validate numeric_only",
                                        'data-validation' => "required",
                                        'maxlength' => '3'
                                    ))
                                    ?>
                                </div> <!--col-->
                            </div> <!--row-->
                            <div class="top10 row">
                                <div class="col-md-12">
                                    <?php
                                    if ($clientes_list = Driver::getClientesList()) {
                                        $clientes_list = Driver::toList($clientes_list, 'id_cliente', 'nombres', Driver::t("Por favor seleccione un cliente de la lista"));
                                    }

                                    echo CHtml::dropDownList('id_cliente', '', (array) $clientes_list
                                        , array(
                                            'class' => "id_cliente chosen",
                                            'required' => true
                                        ))
                                    ?>
                                </div> <!--col-->
                            </div>
                            <div class="top20">
                                <h5 style="font-weight:bold;" class="dropoff_action_1"><?php echo t("Datos Origen") ?></h5>
                                <div class="row top20" style="margin-bottom:10px;">
                                    <div class="col-md-12 content_contacto_origen">
                                        <select required="true" class="contacto_origen chosen" name="contacto_origen" id="contacto_origen">
                                            <option ><?php echo Driver::t("Por favor seleccione un contacto de la lista") ?></option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row top10">
                                    <div class="col-md-6">
                                        <?php
                                        echo CHtml::textField('origen', '', array(
                                            'placeholder' => Driver::t("Origen"),
                                            'required' => true
                                        ))
                                        ?>
                                    </div> <!--col-->
                                    <div class="col-md-6 ">
                                        <?php
                                        $cities = array(
                                            "33" => "AMBATO",
                                            "31" => "CUENCA",
                                            "2"   => "QUITO",
                                            "29"  => "GUAYAQUIL",
                                        );

                                        echo CHtml::dropDownList('ciudad_origen_id_n', '', (array) $cities
                                            , array(
                                                    'empty'=>'Por favor seleccione una ciudad de la lista',
                                                'class' => "ciudad_origen_id_n chosen",
                                                'required' => true
                                            ))
                                        ?>
                                    </div> <!--col-->
                                </div>
                                <div class="row top10">
                                    <div class="col-md-12 ">
                                        <?php
                                        echo CHtml::textField('direccion_origen', '', array(
                                            'class' => 'direccion_origen',
                                            'placeholder' => Driver::t("Dirección Origen"),
                                            'required' => true
                                        ));
                                        ?>
                                    </div> <!--col-->
                                </div>
                                <div class="row top10">
                                    <div class="col-md-6 ">
                                        <?php
                                        echo CHtml::textField('remitente', '', array(
                                            'placeholder' => t("Remitente"),
                                            'required' => true
                                        ))
                                        ?>
                                    </div>
                                    <div class="col-md-6 ">
                                        <?php
                                        echo CHtml::textField('telefono_remitente', '', array(
                                            'placeholder' => t("Teléfono Remitente"),
                                            'class' => "mobile_inputs",
                                            'maxlength' => '10'
                                        ))
                                        ?>
                                    </div>
                                </div>
                            </div> <!--delivery-info-wrap-->
                            <div class="top20">
                                <h5 style="font-weight:bold;" class="dropoff_action_2"><?php echo t("Datos Destino") ?></h5>
                                <div class="row top20">
                                    <div class="col-md-12 content_contacto_destino">
                                        <select required="true" class="contacto_destino chosen" name="contacto_destino" id="contacto_destino">
                                            <option ><?php echo Driver::t("Por favor seleccione un contacto de la lista") ?></option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row top10">
                                    <div class="col-md-6">
                                        <?php
                                        echo CHtml::textField('destino', '', array(
                                            'placeholder' => Driver::t("Destino"),
                                            'required' => true
                                        ))
                                        ?>
                                    </div> <!--col-->
                                    <div class="col-md-6 ">
                                        <select required="true" class="ciudad_destino_id_n chosen" name="ciudad_destino_id_n" id="ciudad_destino_id_n">
                                            <option >Por favor seleccione una ciudad de la lista</option>
                                            <option value="33">AMBATO</option>
                                            <option value="31">CUENCA</option>
                                            <option value="2">QUITO</option>
                                            <option value="29">GUAYAQUIL</option>
                                        </select>
                                    </div> <!--col-->
                                </div> <!--row-->
                                <div class="row top10">
                                    <div class="col-md-12 ">
                                        <?php
                                        echo CHtml::textField('direccion_destino', '', array(
                                            'class' => 'direccion_origen',
                                            'placeholder' => Driver::t("Dirección Destino"),
                                            'required' => true
                                        ));
                                        ?>
                                    </div> <!--col-->
                                </div>
                                <div class="row top10">
                                    <div class="col-md-6 ">
                                        <?php
                                        echo CHtml::textField('recibe', '', array(
                                            'placeholder' => t("Destinatario"),
                                            'required' => true
                                        ))
                                        ?>
                                    </div>
                                    <div class="col-md-6 ">
                                        <?php
                                        echo CHtml::textField('telefono_recibe', '', array(
                                            'placeholder' => t("Teléfono Recipiente"),
                                            'class' => "mobile_inputs"
                                        ))
                                        ?>
                                    </div>
                                </div>
                            </div> <!--dropoff_wrap-->



                        </div> <!--col-->


                    </div> <!--row-->

                    <div class="panel-footer top20">

                        <button type="submit" class="orange-button medium rounded new-orden-submit">
                            <?php echo t("Guardar") ?>
                        </button>

                        <button type="button" data-id=".new-orden" 
                                class="close-modal green-button medium rounded"><?php echo t("Cancelar") ?></button>
                    </div>
                </form>
            </div> <!--panel-footer-->



        </div> <!--body-->

    </div> <!--modal-content-->
</div> <!--modal-dialog-->