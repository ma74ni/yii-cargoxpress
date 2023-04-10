
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
                <?php echo CHtml::hiddenField('no_gestiones', 0) ?>
                <?php echo CHtml::hiddenField('peso', 0) ?>
                    <?php echo CHtml::hiddenField('action', 'addOrden') ?>
                    <?php
                    echo CHtml::hiddenField('orden_id', '', array(
                        'class' => "orden_id"
                    ));
                    echo CHtml::hiddenField('estado', '', array(
                        'class' => "estado"
                    ));
                    ?>
                    <div class="row">
                        <div class="col-md-12 ">

                            <h5><?php echo Driver::t("Detalle") ?></h5>
                            <div class="top10">
                                <?php
                                echo CHtml::textArea('detalle', '', array(
                                    'class' => "",
                                    'required' => true
                                ))
                                ?>
                            </div>

                            <div class="top10 row">
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
                            <?php
                            if ($contact_list = Driver::getContactoList(Driver::getClienteId())) {
                                $contact_list = Driver::toList($contact_list, 'contacto_id', 'contacto', Driver::t("Por favor seleccione un contacto de la lista"));
                            }

                            if ($provincia_list = Driver::getProvinciaList()) {
                                $provincia_list = Driver::toList($provincia_list, 'id', 'nombre', Driver::t("Por favor seleccione una provincia de la lista"));
                            }
                            ?>

                            <div class="top20">
                                <h5 style="font-weight:bold;" class="dropoff_action_1"><?php echo t("Datos Origen") ?></h5>
                                <div class="row" style="margin-bottom:10px;">
                                    <div class="col-md-12">
                                        <?php
                                        echo CHtml::dropDownList('contacto_origen', '', (array) $contact_list
                                                , array(
                                            'class' => "contacto_origen chosen"
                                        ))
                                        ?>
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
                                        <select required="true" class="ciudad_origen_id_n chosen" name="ciudad_origen_id_n" id="ciudad_origen_id_n">
                                            <option >Por favor seleccione una ciudad de la lista</option>
                                            <option value="2">QUITO</option>
                                            <option value="29">GUAYAQUIL</option>
                                        </select>
                                    </div> <!--col-->
                                </div> <!--row-->
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
                                            'class' => "mobile_inputs"
                                        ))
                                        ?>
                                    </div>
                                </div>
                            </div> <!--delivery-info-wrap-->


                            <div class="top20"> 

                                <h5 style="font-weight:bold;" class="dropoff_action_2"><?php echo t("Datos Destino") ?></h5>

                                <div class="row" style="margin-bottom:10px;">
                                    <div class="col-md-12">
                                        <?php
                                        echo CHtml::dropDownList('contacto_destino', '', (array) $contact_list
                                                , array(
                                            'class' => "contacto_destino chosen"
                                        ))
                                        ?>
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