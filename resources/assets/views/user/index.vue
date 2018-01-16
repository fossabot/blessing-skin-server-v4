<template>
    <user-master>
        <Row :gutter="16">
            <Col :sm="24" :md="16" :lg="16">
                <Card>
                    <p slot="title">Sign</p>
                </Card>
            </Col>
            <Col :sm="24" :md="8" :lg="8">
                <Card>
                    <p slot="title">Announcement</p>
                </Card>
            </Col>
        </Row>
    </user-master>
</template>

<script>
import UserMaster from './master';

export default {
    components: {
        UserMaster
    }
};
</script>
