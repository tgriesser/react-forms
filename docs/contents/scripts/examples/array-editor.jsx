/**
 * @jsx React.DOM
 */
(function() {
'use strict';

var cloneWithProps   = React.addons.cloneWithProps;

var Form             = ReactForms.Form;
var List             = ReactForms.schema.List;
var Property         = ReactForms.schema.Property;

var ArrayEditor = React.createClass({

  mixins: [ReactForms.RepeatingFieldsetMixin],

  onFocus: function(idx, e) {
    if (this.valueLens().val().length - 1 === idx) {
      this.add();
    }
  },

  onRemoveItem: function(idx) {
    if (idx === 0 && this.valueLens().val().length === 1) {
      this.updateValue([null]);
    } else {
      this.remove(idx);
    }
  },

  decorate: function(item) {
    item = React.addons.cloneWithProps(
      item,
      {onFocus: this.onFocus.bind(null, item.props.name)}
    );
    return (
      <div key={item.props.name} className="Item">
        {item}
        <button
          onClick={this.onRemoveItem.bind(null, item.props.name)}
          tabIndex="-1"
          type="button"
          className="Remove">&times;</button>
      </div>
    );
  },

  render: function() {
    var fields = this.renderFields().map(this.decorate);
    return this.transferPropsTo(<div className="ArrayEditor">{fields}</div>);
  }

});

var Values = (
  <List component={ArrayEditor}>
    <Property />
  </List>
);

React.renderComponent(
  <ShowValue horizontal onUpdate>
    <Form schema={Values} value={['focus on me!']} />
  </ShowValue>,
  document.getElementById('example')
);

})();
