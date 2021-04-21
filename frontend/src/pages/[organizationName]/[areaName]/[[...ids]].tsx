import React, { useRef, useState } from 'react';
import { Button, Drawer, Fab, makeStyles, Slide } from '@material-ui/core';
import { useRouter } from 'next/router';
import Layout from '@/components/layout';
import Map from '@/components/map';
import ErrorPage from 'next/error';
import AddIcon from '@material-ui/icons/Add';
import { Marker, Polygon } from '@react-google-maps/api';
import HouseIcon from '@material-ui/icons/House';
import Crop54Icon from '@material-ui/icons/Crop54';
import { gql } from '@apollo/client';
import { useGetUserAreaQuery, useCreateResidenceMutation, useUpdateResidenceMutation } from '@/types/graphql';
import { actions, useAppDispatch } from '@/ducks/store';

// 地図ページ。設定画面と兼用

const useStyle = makeStyles((theme) => ({
  button: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

// 会衆＆区域でユーザーの区域情報を取得する

// クエリ定義
export const getUserAreaGql = gql`
  query getUserArea($organizationId: ID!, $areaId: ID!) {
    userAreas(organizationId: $organizationId, ids: [$areaId]) {
      area {
        id
        name
        description
        residences {
          id
          name
          latitude
          longitude
          residents {
            id
            room
            floor
          }
        }
        polygons {
          id
          points {
            id
            latitude
            longitude
          }
        }
      }
    }
  }
`;

export const createResidenceGql = gql`
  mutation createResidence($areaId: ID!, $latitude: Float!, $longitude: Float!) {
    createResidence(residence: { areaId: $areaId, name: "", latitude: $latitude, longitude: $longitude }) {
      id
      latitude
      longitude
      name
      residents {
        id
        room
        floor
      }
    }
  }
`;

export const updateResidenceGql = gql`
  mutation updateResidence($id: ID!, $latitude: Float!, $longitude: Float!) {
    updateResidence(residence: { id: $id, name: "", latitude: $latitude, longitude: $longitude }) {
      id
      latitude
      longitude
      name
      residents {
        id
        room
        floor
      }
    }
  }
`;

// export const createPolygonGql = gql`
//   mutation createPolygon(){
//   }
// `;`

// パスはここから取得
// https://fonts.google.com/icons?selected=Material+Icons&icon.query=house
const HousePath = 'M19,9.3V4h-3v2.6L12,3L2,12h3v8h5v-6h4v6h5v-8h3L19,9.3z M10,10c0-1.1,0.9-2,2-2s2,0.9,2,2H10z';
const ApartmentPath =
  'M17,11V3H7v4H3v14h8v-4h2v4h8V11H17z M7,19H5v-2h2V19z M7,15H5v-2h2V15z M7,11H5V9h2V11z M11,15H9v-2h2V15z M11,11H9V9h2 V11z M11,7H9V5h2V7z M15,15h-2v-2h2V15z M15,11h-2V9h2V11z M15,7h-2V5h2V7z M19,19h-2v-2h2V19z M19,15h-2v-2h2V15z';

const AreaPage = () => {
  const dispatch = useAppDispatch();
  const [roomEditTargetRoomId, setRoomEditTargetRoomId] = useState<number | undefined>();

  const [selectedResidenceId, setSelectedResidenceId] = useState<string | undefined>();
  const [selectedPolygonId, setSelectedPolygonId] = useState<string | undefined>();

  // const [mapZoom, setMapZoom] = useState<number>();
  // const [mapCenter, setMapCenter] = useState<MapPosition>({ latitude: 0, longitude: 0 });

  const classes = useStyle();
  const router = useRouter();
  const organizationName = (router.query.organizationName ?? '').toString();
  // const organizationPath = '/' + organizationName;
  const areaName = (router.query.areaName ?? '').toString();
  // const areaPath = (organizationName === '' ? '' : '/' + organizationName) + (areaName === '' ? '' : '/' + areaName);

  const [createResidence, createResidenceResult] = useCreateResidenceMutation({
    // // これがうまく動かない
    // optimisticResponse: {
    //   __typename: 'Mutation',
    //   createResidence: {
    //     __typename: 'Residence',
    //     id: '100',
    //     name: '',
    //     latitude: pos.lat,
    //     longitude: pos.lng,
    //     residents: [],
    //   },
    // },
    update: (cache, { data }) => {
      // こんな感じで書きたい
      // RefreshCache(getUserAreaResult,(cache)=>cache.userAreas[0].area.residences.push(data?.createResidence));

      // getUserAreaResult.variables

      // キャッシュデータ取得
      const copiedData = JSON.parse(
        JSON.stringify(
          cache.readQuery({
            query: getUserAreaGql,
            variables: getUserAreaResult.variables,
          }),
        ),
      );

      // クエリに対するキャッシュデータ書き換え
      copiedData.userAreas[0].area.residences.push(data?.createResidence);

      // キャッシュデータ更新
      cache.writeQuery({
        query: getUserAreaGql,
        variables: getUserAreaResult.variables,
        data: copiedData,
      });
    },
  });

  const [updateResidence, updateResidenceResult] = useUpdateResidenceMutation();

  const getUserAreaResult = useGetUserAreaQuery({
    variables: { organizationId: organizationName, areaId: areaName },
  });
  const userArea = getUserAreaResult.data?.userAreas?.[0];

  // // ユーザーがこの組織に所属していなければ404
  // if (error != null) {
  //   const errorCode = error.graphQLErrors?.[0]?.extensions?.['code'];
  //   if (errorCode === 'NOT_FOUND') {
  //     return <Custom404 />;
  //   }
  // }

  // この区域がユーザーに配られていなければ404を表示する
  if (router.query.id == null) {
    // 通常モード
  } else if (router.query.ids?.[0] === 'settings') {
    // 設定モード
    // 設定モードでは、保存とキャンセルの操作を下に表示？
  } else {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout title={areaName + (createResidenceResult.loading ? '読み込み中' : '')} fillContent={true}>
      {userArea != null && (
        <>
          <Map>
            {(map) => (
              <>
                {userArea.area.residences.map((residence) => {
                  const isSelected = selectedResidenceId === residence.id;
                  return (
                    <Marker
                      key={'residence:' + residence.id}
                      position={{ lat: residence.latitude, lng: residence.longitude }}
                      icon={{
                        fillColor: isSelected ? '#0000FF' : '#8888FF', //塗り潰し色
                        strokeColor: '#6666AA', //枠の色
                        fillOpacity: 1.0,
                        strokeOpacity: 1.0,
                        strokeWeight: 1.0, //枠の透過率
                        anchor: new window.google.maps.Point(12, 12),
                        path: HousePath,
                        scale: 1.5,
                      }}
                      draggable={isSelected}
                      onClick={() => setSelectedResidenceId(residence.id)}
                      onDragEnd={(e) => {
                        updateResidence({
                          variables: {
                            id: residence.id,
                            latitude: e.latLng.lat(),
                            longitude: e.latLng.lng(),
                          },
                          optimisticResponse: {
                            updateResidence: Object.assign({}, residence, {
                              __typename: 'Residence',
                              latitude: e.latLng.lat(),
                              longitude: e.latLng.lng(),
                            }),
                          },
                        });
                      }}
                    />
                  );
                })}

                {userArea.area.polygons.map((polygon) => {
                  const isSelected = selectedPolygonId === polygon.id;
                  return (
                    <Polygon
                      key={'polygon:' + polygon.id}
                      editable={true} // ポイント移動を許可
                      draggable={true} // エッジ追加を許可
                      options={{
                        fillOpacity: 0, // 塗りつぶし無し
                        geodesic: false,
                        clickable: false, // 全体のクリック禁止
                        strokeColor: 'blue',
                      }}
                      // onClick={() => setSelectedResidenceId(residence.id)}
                      // onDragEnd={(e) => {
                      //   updateResidence({
                      //     variables: {
                      //       id: residence.id,
                      //       latitude: e.latLng.lat(),
                      //       longitude: e.latLng.lng(),
                      //     },
                      //     optimisticResponse: {
                      //       updateResidence: Object.assign({}, residence, {
                      //         __typename: 'Residence',
                      //         latitude: e.latLng.lat(),
                      //         longitude: e.latLng.lng(),
                      //       }),
                      //     },
                      //   });
                      // }}
                    />
                  );
                })}

                {/* <Polygon
                  editable={true} // ポイント移動を許可
                  draggable={true} // エッジ追加を許可
                  options={{
                    fillOpacity: 0, // 塗りつぶし無し
                    geodesic: false,
                    clickable: false, // 全体のクリック禁止
                    strokeColor: 'blue',
                  }}
                  onClick={(e) => {
                    console.log(e);
                  }}
                  path={[
                    {
                      lat: 35.69575,
                      lng: 139.77521,
                    },
                    {
                      lat: 36.69575,
                      lng: 138.77521,
                    },
                    {
                      lat: 36.69575,
                      lng: 139.77521,
                    },
                  ]}
                ></Polygon> */}

                <Slide direction="up" in={router.query.ids?.[0] === 'settings'} mountOnEnter unmountOnExit>
                  <div className={classes.button}>
                    <Fab
                      color="secondary"
                      onClick={async () => {
                        const pos = map.getCenter().toJSON();
                        const result = await createResidence({
                          variables: {
                            areaId: userArea.area.id,
                            latitude: pos.lat,
                            longitude: pos.lng,
                          },
                        });
                      }}
                    >
                      <HouseIcon />
                      <AddIcon />
                    </Fab>

                    <Fab
                      color="secondary"
                      onClick={async () => {
                        // const pos = map.getCenter().toJSON();
                        // const zoom = map.getZoom();
                        // const result = await createResidence({
                        //   variables: {
                        //     areaId: userArea.area.id,
                        //     latitude: pos.lat,
                        //     longitude: pos.lng,
                        //   },
                        // });
                      }}
                    >
                      <Crop54Icon />
                      <AddIcon />
                    </Fab>
                  </div>
                </Slide>
              </>
            )}
          </Map>

          {/* 部屋選択 */}
          {/* <Drawer
            anchor="bottom"
            open={selectedResidenceId != null && roomEditTargetRoomId == null}
            onClose={() => setSelectedResidenceId(undefined)}
          >
            <div>部屋選択</div>
            <div
              style={{
                display: 'grid',
                gridTemplateRows: 'repeat(3,50)',
                gridTemplateColumns: 'repeat(15,1fr)',
                gap: 5,
                margin: 5,
              }}
            >
              <Button
                variant="contained"
                style={{
                  gridColumn: 1,
                  gridRow: 3,
                  minWidth: 0,
                }}
              >
                101
              </Button>
              <Button
                variant="contained"
                style={{
                  gridColumn: 2,
                  gridRow: 3,
                  minWidth: 0,
                }}
              >
                101
              </Button>
              <Button
                variant="contained"
                style={{
                  gridColumn: 2,
                  gridRow: 2,
                  minWidth: 0,
                }}
              >
                202
              </Button>
              <Button
                variant="contained"
                style={{
                  gridColumn: 3,
                  gridRow: 2,
                  minWidth: 0,
                }}
              >
                203
              </Button>
              <Button
                variant="contained"
                style={{
                  gridColumn: 4,
                  gridRow: 2,
                  minWidth: 0,
                }}
              >
                204
              </Button>
              <Button
                variant="contained"
                style={{
                  gridColumn: 15,
                  gridRow: 1,
                  minWidth: 0,
                }}
                onClick={() => {
                  setRoomEditTargetRoomId(1);
                }}
              >
                3015
              </Button>
            </div>
          </Drawer>

          <Drawer
            anchor="bottom"
            open={roomEditTargetRoomId != null}
            onClose={() => {
              setSelectedResidenceId(undefined);
              setRoomEditTargetRoomId(undefined);
            }}
          >
            <div>操作</div>

            <Button variant="contained" startIcon={<DoneRoundedIcon />}>
              完了
            </Button>
            <Button variant="contained" startIcon={<BlockRoundedIcon />}>
              拒否
            </Button>
            <Button variant="contained">不在</Button>

            <Button
              variant="contained"
              startIcon={<KeyboardBackspaceRoundedIcon />}
              onClick={() => {
                setRoomEditTargetRoomId(undefined);
              }}
            >
              部屋一覧
            </Button>
          </Drawer> */}
        </>
      )}
    </Layout>
  );
};
export default AreaPage;
