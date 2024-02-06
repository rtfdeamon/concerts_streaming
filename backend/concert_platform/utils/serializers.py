class ReadWriteSerializerViewSetMixin():
    read_serializer_class = None
    write_serializer_class = None

    def get_serializer_class(self):        
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return self.write_serializer_class
        return self.read_serializer_class