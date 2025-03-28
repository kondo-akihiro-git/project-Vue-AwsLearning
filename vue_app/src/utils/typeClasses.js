export const getTypeClass = (typeName) => {
    const typeClassMap = {
        "service": "background-aws-service",
        "method": "background-tech-method",
        "technical term": "background-tech-term",
        "attitude": "background-aws-attitude",
        "aws term": "background-aws-term",
        "default": "background-default-type"
    };
    
    return typeClassMap[typeName] || typeClassMap["default"];
};

export const getTypeLabel = (typeName) => {
    const typeLabelMap = {
        "service": "AWSサービス",
        "method": "AWS特有の技術的手法",
        "technical term": "一般用語",
        "attitude": "AWS特有の考え方",
        "aws term": "AWS特有の用語・覚えておくこと"
    };
    
    return typeLabelMap[typeName] || null;
};
