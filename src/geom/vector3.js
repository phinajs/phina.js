
phina.namespace(function() {

  /**
   * @class phina.geom.Vector3
   * # 3次元ベクトルクラス（未実装）
   * 3次元のベクトルや座標を表すクラスです。
   */
  phina.define('phina.geom.Vector3', {

    /** x座標 */
    x: 0,
    /** y座標 */
    y: 0,
    /** z座標 */
    z: 0,

    /**
     * @constructor
     */
    init: function(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
    },

  });

});
