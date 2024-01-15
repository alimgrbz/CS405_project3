class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        var transformationMatrix = this.trs.getTransformationMatrix();

        var transformedMvp = MatrixMult(mvp, transformationMatrix);
        var transformedModelView = MatrixMult(modelView, transformationMatrix);
        var transformedNormals = MatrixMult(normalMatrix, transformationMatrix);
        var transformedModel = MatrixMult(modelMatrix, transformationMatrix);


        if (this.meshDrawer) {
            this.meshDrawer.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }

        for (var child of this.children) {
            child.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }
    }
}

