<?php
$this->renderPartial('/front/busca-orden', array(
));
?>
<!--? Preloader Start -->
<div id="preloader-active">
    <div class="preloader d-flex align-items-center justify-content-center">
        <div class="preloader-inner position-relative">
            <div class="preloader-circle"></div>
            <div class="preloader-img pere-text">
                <img src="<?php echo Yii::app()->request->baseUrl; ?>/assets/front/img/logo/loder.jpg" alt="">
            </div>
        </div>
    </div>
</div>
<!-- Preloader Start -->
<!--? slider Area Start-->
<div class="banner">
    <img src="<?php echo Yii::app()->request->baseUrl; ?>/assets/front/img/banner/main.jpg" alt="">
</div>
<!-- slider Area End-->
<?php
Yii::app()->clientScript->registerScriptFile(
        Yii::app()->baseUrl . '/assets/front/js/whatsappme.min.js', CClientScript::POS_END
);

$baseUrl = Yii::app()->baseUrl . "";
$cs = Yii::app()->getClientScript();
$cs->registerCssFile($baseUrl . "/assets/front/css/whatsappme.min.css");
?>
