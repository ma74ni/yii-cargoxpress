
<div class="modal new-contacto" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

            <div class="modal-header">
                <h4 id="myLargeModalLabel" class="modal-title">
                    <?php echo t("Contacto") ?>
                </h4>
                <button aria-label="Cerrar" data-dismiss="modal" class="close" type="button">
                    <span aria-hidden="true"><i class="ion-android-close"></i></span>
                </button>
            </div>
            <div class="modal-body">
                <form id="frm_contacto" class="frm" method="POST" onsubmit="return false;">
                    <?php echo CHtml::hiddenField('action', 'addContacto') ?>
                    <?php
                    echo CHtml::hiddenField('contacto_id', '', array(
                        'class' => "contacto_id"
                    ));
                    ?>
                    <div class="row">
                        <div class="col-md-12 ">
                            <h5><?php echo Driver::t("Detalle") ?></h5>
                            <div class="top20">
                                <div class="row top10">
                                    <div class="col-md-6">
                                        <?php
                                        echo CHtml::textField('empresa', '', array(
                                            'placeholder' => Driver::t("Empresa"),
                                            'required' => true
                                        ))
                                        ?>
                                    </div> <!--col-->
                                   <div class="col-md-6 ">
                                       <select required="true" class="ciudad_id_n chosen" name="ciudad_id_n" id="ciudad_id_n">
                                           <option >Por favor seleccione una ciudad de la lista</option>
                                           <option value="2">QUITO</option>
                                           <option value="29">GUAYAQUIL</option>
                                       </select>
                                   </div> <!--col-->
                                </div> <!--row-->

                                <div class="row top10">
                                    <div class="col-md-12 ">
                                        <?php
                                        echo CHtml::textField('direccion', '', array(
                                            'class' => 'direccion_origen',
                                            'placeholder' => Driver::t("Dirección"),
                                            'required' => true
                                        ));
                                        ?>
                                    </div> <!--col-->
                                </div>
                                <div class="row top10">
                                    <div class="col-md-6 ">
                                        <?php
                                        echo CHtml::textField('telefono', '', array(
                                            'placeholder' => t("Teléfono"),
                                            'class' => "mobile_inputs"
                                        ))
                                        ?>
                                    </div>
                                    <div class="col-md-6 ">
                                        <?php
                                        echo CHtml::textField('contacto', '', array(
                                            'placeholder' => t("contacto"),
                                            'required' => true
                                        ))
                                        ?>
                                    </div>


                                </div> <!--row-->
                            </div>
                        </div> <!--delivery-info-wrap-->
                    </div> <!--col-->
                    <div class="panel-footer top20">
                        <button type="submit" class="orange-button medium rounded new-contacto-submit">
                            <?php echo t("Guardar") ?>
                        </button>
                        <button type="button" data-id=".new-contacto" class="close-modal green-button medium rounded"><?php echo t("Cancelar") ?></button>
                    </div>
                </form>

            </div> <!--row-->
        </div> <!--panel-footer-->



    </div> <!--body-->

</div> <!--modal-content-->
</div> <!--modal-dialog-->