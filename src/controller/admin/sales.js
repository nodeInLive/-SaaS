// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------

module.exports = class extends think.cmswing.admin {
    constructor(ctx) {
      super(ctx); // 调用父级的 constructor 方法，并把 ctx 传递进去
      this.db = this.model('seat_list');
      this.tactive = 'sales';
    }
  
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
      // auto render template file index_index.html
      const map = {};
      if (!think.isEmpty(this.get('model'))) {
        map.model = this.get('model');
      }
      const list = await this.db.where(map).page(this.get('page') || 1, 20).order('id DESC').countSelect();
      this.assign('list', list);
      // console.log(modlist);
      this.meta_title = '销售';
      return this.display();
    }

    // 座位详情
    async infoAction(){
        let id = this.get('id');
        this.assign('id',id);
        return this.display();
    }

    // 开始计费
    async startAction(){
        let id = this.get('id');
        let map = {};
        map.id = id;
        map.status = 0;
        if (!think.isEmpty(this.get('model'))) {
            map.model = this.get('model');
        }
        let data = {status:1, start_time: Date.now()};
        let res = await this.db.thenUpdate(data, map);
        if(res) return this.success({name: '操作成功!'});
        return this.fail('操作失败！');
    }

    // 结束计费
    async endAction(){
        let id = this.get('id');
        let map = {};
        map.id = id;
        map.status = 1;
        if (!think.isEmpty(this.get('model'))) {
            map.model = this.get('model');
        }
        let data = {status:0, end_time: Date.now()};
        let res = await this.db.thenUpdate(data, map);
        if(res) return this.success({name: '操作成功!'});
        return this.fail('操作失败！');
    }
  
  };
  