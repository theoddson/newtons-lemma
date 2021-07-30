//Checkbox Hack fix to map to desktop checkboxes to the mobile, need to make this into a function
$('#checkbox_1').change(function () {
    if ($(this).prop('checked')) {
        $('#checkbox_1_m').prop('checked', true);
    }
    else {
        $('#checkbox_1_m').prop('checked', false);
    }
});
$('#checkbox_1').trigger('change');
$('#checkbox_1_m').change(function () {
    if ($(this).prop('checked')) {
        $('#checkbox_1').prop('checked', true);
    }
    else {
        $('#checkbox_1').prop('checked', false);
    }
});
$('#checkbox_1').trigger('change');



$('#checkbox_2').change(function () {
    if ($(this).prop('checked')) {
        $('#checkbox_2_m').prop('checked', true);
    }
    else {
        $('#checkbox_2_m').prop('checked', false);
    }
});
$('#checkbox_2').trigger('change');
$('#checkbox_2_m').change(function () {
    if ($(this).prop('checked')) {
        $('#checkbox_2').prop('checked', true);
    }
    else {
        $('#checkbox_2').prop('checked', false);
    }
});
$('#checkbox_2_m').trigger('change');


$('#checkbox_3').change(function () {
    if ($(this).prop('checked')) {
        $('#checkbox_3_m').prop('checked', true);
    }
    else {
        $('#checkbox_3_m').prop('checked', false);
    }
});
$('#checkbox_3').trigger('change');
$('#checkbox_3_m').change(function () {
    if ($(this).prop('checked')) {
        $('#checkbox_3').prop('checked', true);
    }
    else {
        $('#checkbox_3').prop('checked', false);
    }
});
$('#checkbox_3_m').trigger('change');


$('#checkbox_4').change(function () {
    if ($(this).prop('checked')) {
        $('#checkbox_4_m').prop('checked', true);
    }
    else {
        $('#checkbox_4_m').prop('checked', false);
    }
});
$('#checkbox_4').trigger('change');

$('#checkbox_4_m').change(function () {
    if ($(this).prop('checked')) {
        $('#checkbox_4').prop('checked', true);
    }
    else {
        $('#checkbox_4').prop('checked', false);
    }
});
$('#checkbox_4_m').trigger('change');