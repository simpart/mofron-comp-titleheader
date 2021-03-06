/**
 * @file   mofron-comp-ttlhdr/index.js
 * @brief  title header component for mofron
 * @author simpart
 */
let mf      = require('mofron');
let Header  = require('mofron-comp-header');
let Text    = require('mofron-comp-text');
let Click   = require('mofron-event-click');
let Horizon = require('mofron-layout-horizon');

mf.comp.Ttlhdr = class extends Header {
    constructor (po) {
        try {
            super();
            this.name('Ttlhdr');
            this.prmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    /**
     * initialize dom contents
     *
     * @param prm : (string, mofron-comp-text) title
     */
    initDomConts(prm) {
        try {
            super.initDomConts();
            
            this.target().style({
                'align-items'  : 'center',
            });
            let ttl_base = new mf.Component({
                addLayout : new Horizon(),
                style : { 
                    'align-items' : 'center',
                    'margin-left' : '20px'
                }
            });
            this.addChild(ttl_base);
            
            /* set header title area */
            this.title(prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    title (val, idx) {
        try {
            let ttl = this.child()[0];
            if (undefined === val) {
                /* getter */
                return (0 === ttl.child().length) ? null : ttl.child();
            }
            /* setter */
            if ('string' === typeof val) {
                val = new Text(val);
            } else if (true !== mf.func.isInclude(val, 'Component')) {
                throw new Error('invalid parameter');
            }
            
            if (true === mf.func.isInclude(val, 'Text')) {
                val.size(this.height()-10);
            } else if (true === mf.func.isInclude(val, 'Component')) {
                val.height(this.height());
            } else {
                throw new Error('invalid parameter');
            }
            
            if (null !== this.url()) {
                this.setTitleEvent(val);
            }
            this.setTitleColor(val);
            
            ttl.addChild(val, idx);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setTitleEvent (val) {
        try {
            let clk_fnc = (tgt, ttl) => {
                try {
                    location.href = ttl.url();
                } catch (e) {
                    console.log(e.stack);
                }
            };
            /* set click event */
            val.addEvent(
                new Click(clk_fnc, this)
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setTitleColor (ttl) {
        try {
            if (null === this.color()) {
                return;
            }
            let rgb = this.color().rgba();
            let clr = (290 > (rgb[0]+rgb[1]+rgb[2])) ?
                      new mf.Color(255,255,255) : new mf.Color(0,0,0);
            
            if ((true === mf.func.isInclude(ttl, 'Text')) && (null === ttl.color())) {
                ttl.color(clr);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    color (clr) {
        try {
            var ret = super.color(clr);
            if (undefined !== ret) {
                if (null === ret) {
                    this.color(new mf.Color(255,255,255));
                    return this.color();
                }
                return ret;
            }
            let ttl = this.title();
            if (null !== ttl) {
                for (let tidx in ttl) {
                    this.setTitleColor(ttl[tidx]);
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    url (ul) {
        try {
            if (undefined === ul) {
                /* getter */
                return (undefined === this.m_url) ? null : this.m_url;
            }
            /* setter */
            if ('string' !== typeof ul) {
                throw new Error('invalid prameter');
            }
            this.m_url = ul;
            
            let ttl = this.title();
            if (null !== ttl) {
                for (let tidx in ttl) {
                    this.setTitleEvent(ttl[tidx]);
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    height (val) {
        try {
            let ret = super.height(val);
            if (undefined !== ret) {
                /* getter */
                return ret;
            }
            /* setter */
            if ('number' !== typeof val) {
                throw new Error('invalid parameter');
            }
            /* resize title text */
            if (0 !== this.child().length) {
                let ttl = this.title();
                for (let tidx in ttl) {
                    if (true === mf.func.isInclude(ttl[tidx], 'Text')) {
                        if (val > 20) {
                            ttl[tidx].size(val-10);
                        }
                    }
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mf.comp.Ttlhdr;
/* end of file */
