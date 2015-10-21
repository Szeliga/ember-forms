import Em from 'ember';
import Utils from 'ember-idx-forms/utils/utils';


/*
Form View

A component for rendering a form element.

Syntax:
{{em-form
    //The layout of the form
    form_layout="form|inline|horizontal"
    //The model bound to the form if any
    model="some_model_instance"
    //The action to be invoked on the controller when a form is submitted.
    action="some_action"
    //if true a submit button will be rendered
    submit_button=true|false
    //if true validation icons will be rendered
    v_icons=true|false
}}
*/
export default Em.Component.extend({
  tagName: 'form',
  classNameBindings: ['form_layout_class'],
  attributeBindings: ['role'],
  role: 'form',
  form_layout_class: Em.computed('form_layout', function() {
    switch (this.get('form_layout')) {
      case 'horizontal':
      case 'inline':
        return "form-" + (this.get('form_layout'));
      default:
        return 'form';
    }
  }),
  //isDefaultLayout: Utils.createBoundSwitchAccessor('form', 'form_layout', 'form'),
  //isInline: Utils.createBoundSwitchAccessor('inline', 'form_layout', 'form'),
  //isHorizontal: Utils.createBoundSwitchAccessor('horizontal', 'form_layout', 'form'),
  action: 'submit',
  errorAction: 'validationError',
  model: void 0,
  form_layout: 'form',
  submit_button: true,
  v_icons: true,

  /*
  Form submit

  Optionally execute model validations and perform a form submission.
   */
  submit: function(e) {
    var _this = this;
    if (e) {
      e.preventDefault();
    }
    if (Em.isNone(this.get('model.validate'))) {
      return this.get('targetObject').send(this.get('action'));
    } else {
      return this.get('model').validate()
        .then(function() {
          _this.get('targetObject').send(_this.get('action'));
        })
        .catch(function() {
          if (_this.get('errorAction')) {
            _this.get('targetObject').send(_this.get('errorAction'));
          }
        })
        .finally(function() {
          _this.$('input, select').blur();
        });
    }
  }
});
