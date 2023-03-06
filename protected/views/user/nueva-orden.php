<?php $this->pageTitle = Yii::app()->name . ' - Nueva Orden'; ?>
<?php
$this->renderPartial('/user/detalle-orden', array(
));
?>

<?php
$this->renderPartial('/tpl/layout1_top_User', array(
));
?> 
<?php
$this->renderPartial('/tpl/menuUser', array(
));
?> 

<div class="content-wrapper">
    <!-- START PAGE CONTENT-->
    <div class="page-content fade-in-up">

        <div class="nav_option">
            <div class="row">
                <div class="col-md-6 ">
                    <b><?php echo t("Nueva Orden") ?></b>
                </div> <!--col-->
            </div> <!--row-->
        </div> <!--nav_option-->
        <div class="content-form">
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
                                        'value' => "Delivery"
                                    ));
                                    ?>
                                    <span><?php echo Driver::t("Delivery") ?></span>
                                </div> <!--col-->
                            </div> <!--row-->
                            <?php
                            if ($contact_list = Driver::getContactoList(Driver::getClienteId())) {
                                $contact_list = Driver::toListAux($contact_list, 'contacto_id', 'contacto', 'empresa', Driver::t("Por favor seleccione un contacto de la lista"));
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
                                            <option value="33">AMBATO</option>
                                            <option value="31">CUENCA</option>
                                            <option value="29">GUAYAQUIL</option>
                                            <option value="2">QUITO</option>
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
                                            <option value="33">AMBATO</option>
                                            <option value="31">CUENCA</option>
                                            <option value="29">GUAYAQUIL</option>
                                            <option value="2">QUITO</option>
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

                        <button type="button" data-id=".new-orden" class="close-modal green-button medium rounded"><?php echo t("Cancelar") ?></button>
                    </div>
                </form>
        </div>
    </div> <!--content_2-->
</div>



<div class="modal table_busqueda" id="table_busqueda" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

            <div class="modal-header">

                <h4 id="mySmallModalLabel" class="modal-title">
                    <?php echo t("Búsqueda Avanzada") ?>
                </h4> 
                <button aria-label="Cerrar" data-dismiss="modal" class="close" type="button">
                    <span aria-hidden="true"><i class="ion-android-close"></i></span>
                </button> 
            </div>  

            <div class="modal-body">
                <div class="s009">
                    <form  id="frm_table_ordenes_user_busqueda" class="frm_table">
                        <?php echo CHtml::hiddenField('action', 'misPedidosFilteredList') ?>
                        <div class="inner-form">
                            <div class="basic-search">
                                <div class="input-field">
                                    <input id="search" name="search" type="text" placeholder="Palabras clave..." />
                                    <div class="icon-wrap">
                                        <svg class="svg-inline--fa fa-search fa-w-16" fill="#ccc" aria-hidden="true" data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div class="advance-search">
                                <span class="desc">BÚSQUEDA AVANZADA</span>
                                <div class="row">
                                    <div class="col-3" >
                                        <p style="padding-left: 15px;"> Código Orden</p>

                                    </div>
                                    <div class="col-3">
                                        <div class="input-select">
                                            <?php
                                            echo CHtml::textField('codigo_orden', '', array(
                                                'required' => false
                                            ))
                                            ?>
                                        </div>
                                    </div>
                                    <div class="col-3">

                                    </div>
                                    <div class="col-3">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-3" style="padding-left: -15px;">


                                        <p style="padding-left: 15px;"> Fecha Creación Desde</p>

                                    </div>
                                    <div class="col-3">
                                        <input autocomplete="off" id="fecha_creacion_desde" name="fecha_creacion_desde" type="text" />

                                    </div>

                                    <div class="col-3" style="padding-left: -15px;">


                                        <p style="padding-left: 15px;"> Fecha Creación Hasta</p>
                                    </div>
                                    <div class="col-3">
                                        <input autocomplete="off" id="fecha_creacion_hasta" name="fecha_creacion_hasta" type="text"  />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-3" style="padding-left: -15px;">

                                        <p style="padding-left: 15px;"> Fecha Envío Desde</p>

                                    </div>
                                    <div class="col-3">
                                        <input autocomplete="off" id="fecha_envio_desde" name="fecha_envio_desde" type="text" />
                                    </div>

                                    <div class="col-3" style="padding-left: -15px;">

                                        <p style="padding-left: 15px;"> Fecha Envío Hasta</p>
                                    </div>
                                    <div class="col-3">
                                        <input autocomplete="off" id="fecha_envio_hasta" name="fecha_envio_hasta" type="text" />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-3" >
                                        <p style="padding-left: 15px;"> Tipo Servicio</p>

                                    </div>
                                    <div class="col-3">
                                        <div class="input-select">
                                            <?php
                                            echo CHtml::dropDownList('tipo_servicio', '', (array) Driver::tipoServicioList(), array(
                                                'class' => "status tipo_servicio"
                                            ))
                                            ?>
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <p style="padding-left: 15px;">  Estado</p>
                                    </div>
                                    <div class="col-3">
                                        <div class="input-select">
                                            <?php
                                            echo CHtml::dropDownList('estado', '', (array) Driver::statusordenList(), array(
                                                'class' => "status estado"
                                            ))
                                            ?>

                                        </div>
                                    </div>
                                    <div class="row third">
                                        <div class="input-field">
                                            <div class="group-btn">
                                                <button class="btn-limpiar" id="limpiar">LIMPIAR</button>
                                                <button type="submit" class="btn-search">BUSCAR</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </form>
                </div>
            </div> <!--panel-footer-->



        </div> <!--body-->

    </div> <!--modal-content-->
</div> <!--modal-dialog-->