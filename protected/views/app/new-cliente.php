
<div class="modal fade new-cliente" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            
            <div class="modal-header">
                <button aria-label="Close" data-dismiss="modal" class="close" type="button">
                    <span aria-hidden="true"><i class="ion-android-close"></i></span>
                </button>
                <h4 id="mySmallModalLabel" class="modal-title">
                    <?php echo t("Cliente") ?>
                </h4>
            </div>

            <div class="modal-body">

                <form id="frm" class="frm" method="POST" onsubmit="return false;">
                    <?php echo CHtml::hiddenField('action', 'addCliente') ?>
                    <?php echo CHtml::hiddenField('id_cliente', '') ?>
                    <div class="inner">
                        <div class="row top10">
                            <div class="col-md-9">

                                <?php
                                echo CHtml::textField('prefijo', '', array(
                                    'placeholder' => t("Prefijo"),
                                    'required' => true
                                ))
                                ?>

                            </div>

                        </div> <!--row-->

                        <div class="row top10">
                            <div class="col-md-9">

                                <?php
                                echo CHtml::textField('nombre', '', array(
                                    'placeholder' => t("Nombre"),
                                    'required' => true
                                ))
                                ?>

                            </div>
                            <div class="col-md-3" style="text-align: right;"></div>

                        </div> <!--row-->

                        <div class="row top10">
                            <div class="col-md-9">

                                <?php
                                echo CHtml::textField('apellido', '', array(
                                    'placeholder' => t("Apellido"),
                                    'required' => true
                                ))
                                ?>

                            </div>
                            <div class="col-md-3" style="text-align: right;"></div>

                        </div> <!--row-->
                          <div class="row top10">
                            <div class="col-md-9">

                                <?php
                                echo CHtml::textField('empresa', '', array(
                                    'placeholder' => t("Empresa"),
                                    'required' => true
                                ))
                                ?>

                            </div>
                            <div class="col-md-3" style="text-align: right;"></div>

                        </div> <!--row-->
                        <div class="row top10">
                            <div class="col-md-6 ">
                                <?php
                                echo CHtml::textField('email', '', array(
                                    'placeholder' => t("Email"),
                                    'data-validation' => 'email',
                                    'required' => true
                                ))
                                ?>
                            </div>
                            <div class="col-md-6 ">
                                <?php
                                echo CHtml::textField('telefono', '', array(
                                    'placeholder' => t("Tel??fono"),
                                    //'class'=>"mobile_inputs",
                                    'required' => true,
                                    'maxlength' => 15
                                ))
                                ?>
                            </div>
                        </div> <!--row-->
                        <div class="row top10">
                            <div class="col-md-6 ">
                                <?php
                                echo CHtml::passwordField('password', '', array(
                                    'placeholder' => t("Contrase??a"),
                                    'data-validation' => 'required',
                                    'class' => "validate,"
                                ))
                                ?>
                            </div>
                            <div class="col-md-6 ">
                                <?php
                                 echo CHtml::passwordField('cpassword', '', array(
                                    'placeholder' => t("Confirmar contrase??a"),
                                    'data-validation' => 'required',
                                    'class' => "validate,"
                                ))
                                ?>
                            </div>
                        </div> <!--row-->

                        <div class="row top20">
                            <div class="col-md-12">
                                <p><?php echo t("Status") ?></p>
                                <?php
                                echo CHtml::dropDownList('status', '', Driver::clienteStatus(), array(
                                    'required' => true
                                ));
                                ?>
                            </div>
                        </div>




                        <div class="row top20">
                            <div class="col-md-6 col-md-offset-7">
                                <button type="submit" class="green-button medium rounded"><?php echo t("Guardar") ?></button>

                            </div>
                            <div class="col-md-6 col-md-offset-7">
                                <button type="button" data-id=".new-cliente" 
                                        class="close-modal red-button medium rounded"><?php echo t("Cancelar") ?></button>
                            </div>
                        </div>        


                    </div> <!--inner-->  
                </form>  

            </div> <!--body-->

        </div>
    </div>
</div>