  item
    a.mdl-navigation__link(href='{link}', target='preview', onclick='{click}') {name}

    script(type='text/javascript').
      this.click = function() {
        location.hash = this.path;
        return true;
      };
